const Owner = require('../models/ownerModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')


const addUnit = async(req,res) => {
    try {
        const unit = req.body
        const newUnit = await Unit.create(unit)
        const property = await Property.findOne({_id : unit.property})
        const owner = await Owner.findOne({_id : property.owner})
        await Owner.updateOne({_id : owner._id},{$inc : {unitCount : 1}})
        const updatedOwner = await Owner.findOne({_id : owner._id}).populate(["user","activePackage"])
        
        res.status(200).send({newUnit,updatedOwner})
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateUnit = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Unit.updateOne({_id}, rest)
        const updatedUnit = await Unit.findOne({_id})
        res.status(200).send(updatedUnit)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getUnits = async(req,res) => {
    try {
        const units = await Unit.find().populate([{
            path : "property",
            populate : {
                path : "owner",
                populate : {
                    path : "user"
                }
            }
        },"owner"])
        res.status(200).send(units)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getOwnerUnits = async(req,res) => {
    try {
        const _id = req.query.id
        const units = await Unit.find({owner : _id}).populate([{
            path : "property",
            populate : {
                path : "owner",
                populate : {
                    path : "user"
                }
            }
        },"owner"])

        res.status(200).send(units)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

  const deleteUnit = async(req,res) => {
    try {
        const _id = req.query.id
        const ownerId = req.query.ownerId
        const propertyId = req.query.propertyId
        await Unit.deleteOne({_id})
        await Owner.updateOne({_id : ownerId},{$inc : {unitCount : -1}})
        await Property.updateOne({_id : propertyId},{$inc : {unitCount : -1}})
        const updatedOwner = await Owner.findOne({_id : ownerId}).populate(["user","activePackage"])
        const updatedProperty = await Property.findOne({_id : propertyId}).populate("owner")
        res.status(200).json({updatedOwner,updatedProperty})
    } catch (error) {
        res.status(500).send(error)
    }
  }

// export

module.exports = {
    addUnit,
    getUnits,
    updateUnit,
    deleteUnit,
    getOwnerUnits
}