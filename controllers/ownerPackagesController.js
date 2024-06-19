const Owner = require('../models/ownerModel')
const OwnerPackage = require('../models/ownerPackageModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')
const Maintainer = require('../models/maintainerModel')
const Invoice = require('../models/invoiceModel')
const Tenant = require('../models/invoiceModel')


const getAllOwnerPackages = async(req,res) => {
    try {
        const ownerPackages = await OwnerPackage.find().populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(ownerPackages)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getOwnerPackages = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const ownerPackages = await OwnerPackage.find({owner}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(ownerPackages)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}
const assignOwnerPackage = async(req,res) => {
    try {
        const data = req.body
        const result = await OwnerPackage.create(data)
        const newOwnerPackage = await OwnerPackage.findOne({_id : result._id}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])

        res.status(200).send(newOwnerPackage)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteOwnerPackage = async(req,res) => {
    try {
        const _id = req.query.id
        await OwnerPackage.deleteOne({_id})
        res.status(200).json({message : "Owner package removed."})

    } catch (error) {
        res.status(500).send(error)
    }
}

const activatePackage = async(req,res) => {
    try {
        const {_id,owner} = req.body
        await OwnerPackage.updateMany({owner},{status : false})
        await OwnerPackage.updateOne({_id},{status : true})
        const activatedPackage = await OwnerPackage.findOne({_id}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])

        // owner update

        await Owner.updateOne({_id : owner},{
            activePackage : activatedPackage.pack._id,
            endDate : activatedPackage.endDate,
            ownerPackage : _id,
            propertyCount : 0,
            unitCount : 0,
            invoiceCount : 0,
            maintainerCount : 0
        })
        
        const updatedOwner = await Owner.findOne({_id : owner}).populate(["user","activePackage"])
        await Property.deleteMany({owner})
        await Unit.deleteMany({owner})
        await Maintainer.deleteMany({owner})
        await Invoice.deleteMany({owner})
        await Tenant.deleteMany({owner})


        res.status(200).json({activatedPackage,updatedOwner})

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
}

// export

module.exports = {
    getAllOwnerPackages,
    getOwnerPackages,
    assignOwnerPackage,
    deleteOwnerPackage,
    activatePackage
}