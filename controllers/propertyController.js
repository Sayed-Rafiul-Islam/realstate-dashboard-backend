const Property = require('../models/propertyModel')


const addProperty = async(req,res) => {
    try {
        const property = req.body
        const newProperty = await Property.create(property)
        res.status(200).send(newProperty)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateProperty = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Property.updateOne({_id}, rest)
        const updatedRequest = await Property.findOne({_id})

        res.status(200).send(updatedRequest)
        
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
  const deleteProperty = async(req,res) => {
    try {
        const _id = req.query.id
        await Property.deleteOne({_id})
        res.status(200).json({message : "Property removed."})
    } catch (error) {
        res.status(500).send(error)
    }
  }

// export

module.exports = {
    addProperty,
    getProperties,
    updateProperty,
    deleteProperty
}