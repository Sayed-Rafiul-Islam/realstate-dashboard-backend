const MaintainanceRequest = require('../models/maintainanceRequestModel')
const MaintainanceType = require('../models/maintainanceTypeModel')
const Maintainer = require('../models/maintainerModel')


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
        const isMaintainer = await Maintainer.find({type : _id})

        if (isMaintainer.length === 0) {
            await MaintainanceType.deleteOne({_id})
            res.status(200).json()
        } else {
            res.status(400).json()
        }
        
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