const MaintainanceRequest = require('../models/maintainanceRequestModel')
const MaintainanceType = require('../models/maintainanceTypeModel')


const createMaintainanceType = async(req,res) => {
    try {
        const type = req.body
        const newType = await MaintainanceType.create(type)
        res.status(200).send(newType)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateMaintainanceType = async(req,res) => {
    try {
        const {_id,...update} = req.body
        await MaintainanceType.updateOne({_id}, update)
        const updatedType = await MaintainanceType.findOne({_id})
        res.status(200).send(updatedType)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getMaintainaceType = async(req,res) => {
    try {
        const owner = req.query.id
        const types = await MaintainanceType.find({owner}).populate("owner")
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteMaintainanceType = async(req,res) => {
    try {
        const _id = req.query.id
        // const ownerId = req.query.ownerId
        // const propertyId = req.query.propertyId
    
        // const isTenant = await Tenant.findOne({unit : _id})

        // if (isTenant) {
        //     res.status(400).json()
        // } else {
        //     await Unit.deleteOne({_id})
        //     await Owner.updateOne({_id : ownerId},{$inc : {unitCount : -1}})
        //     await Property.updateOne({_id : propertyId},{$inc : {unitCount : -1}})
        //     const updatedOwner = await Owner.findOne({_id : ownerId}).populate(["user","activePackage"])
        //     const updatedProperty = await Property.findOne({_id : propertyId}).populate("owner")
        //     res.status(200).json({updatedOwner,updatedProperty})
        // }
        
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createMaintainanceType,
    updateMaintainanceType,
    getMaintainaceType,
    deleteMaintainanceType
}