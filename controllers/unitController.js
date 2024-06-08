const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')


const addUnit = async(req,res) => {
    try {
        const unit = req.body
        const newUnit = await Unit.create(unit)
        console.log(unit)
        
        res.status(200).send(newUnit)
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
        console.log(_id)
        res.status(200).send(updatedUnit)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getUnits = async(req,res) => {
    try {
        const units = await Unit.find().populate({
            path : "property",
            populate : {
                path : "owner",
                populate : {
                    path : "user"
                }
            }
        })
        res.status(200).send(units)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }
  const deleteUnit = async(req,res) => {
    try {
        const _id = req.query.id
        await Unit.deleteOne({_id})
        res.status(200).json({message : "Unit removed."})
    } catch (error) {
        res.status(500).send(error)
    }
  }

// export

module.exports = {
    addUnit,
    getUnits,
    updateUnit,
    deleteUnit
}