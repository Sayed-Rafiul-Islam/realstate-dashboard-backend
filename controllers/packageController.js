const OwnerPackage = require('../models/ownerPackageModel')
const Package = require('../models/packageModel')


const createPackage = async(req,res) => {
    try {
        const package = req.body
        const newPackage = await Package.create(package)
        res.status(200).send(newPackage)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updatePackage = async(req,res) => {
    try {
        const { _id,...rest} = req.body
        await Package.updateOne({_id}, rest)
        const updatedPackage = await Package.findOne({_id})

        res.status(200).send(updatedPackage)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getPackages = async(req,res) => {
    try {
        const packages = await Package.find()
        res.status(200).send(packages)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getActivePackages = async(req,res) => {
    try {
        const packagse = await Package.find({status : true})
        res.status(200).send(packagse)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const deletePackage = async(req,res) => {
    try {
        const _id = req.query.id
        const isPack = await OwnerPackage.find({pack : _id})
        if (isPack.length > 0) {
            res.status(400).json()
        } else {
            await Package.deleteOne({_id})
            res.status(200).json({message : "Package removed."})
        }
    } catch (error) {
        res.status(500).send(error)
    }
  }

// export

module.exports = {
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getActivePackages
}