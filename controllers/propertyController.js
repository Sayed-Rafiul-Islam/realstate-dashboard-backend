const Owner = require('../models/ownerModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')


const addProperty = async(req,res) => {
    try {
        const property = req.body
        const newProperty = await Property.create(property)
        await Owner.updateOne({_id : property.owner},{$inc : {propertyCount : +1}})
        const updatedOwner = await Owner.findOne({_id : property.owner}).populate(["user","activePackage"])
        res.status(200).send({newProperty,updatedOwner})
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateProperty = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Property.updateOne({_id}, rest)
        const updatedProperty = await Property.findOne({_id})

        res.status(200).send(updatedProperty)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getProperties = async(req,res) => {
    try {
        const properties = await Property.find().populate("owner")
        res.status(200).send(properties)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getOwnerProperties = async(req,res) => {
    try {
        const _id = req.query.id
        const properties = await Property.find({owner : _id}).populate("owner")
        res.status(200).send(properties)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

  const deleteProperty = async(req,res) => {
    try {
        const _id = req.query.id
        const ownerId = req.query.ownerId
        const isUnit = await Unit.find({property : _id})

        if (isUnit.length > 0) {
            res.status(400).json({message : "units exist"})
        } else {
            await Property.deleteOne({_id})
            await Owner.updateOne({_id : ownerId},{$inc : {propertyCount : -1}})
            const updatedOwner = await Owner.findOne({_id : ownerId}).populate(["user","activePackage"])
            res.status(200).json(updatedOwner)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
  }

// export

module.exports = {
    addProperty,
    getProperties,
    updateProperty,
    deleteProperty,
    getOwnerProperties
}