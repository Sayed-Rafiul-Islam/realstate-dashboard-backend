const Gateway = require('../models/gatewayModel')
const Notification = require('../models/notificaionModel')


const addGateway = async(req,res) => {
    try {
        const data = req.body
        const result = await Gateway.create(data)
        const newGateway = await Gateway.findOne({_id : result._id}).populate("owner")
        res.status(200).send(newGateway)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateGateway = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Gateway.updateOne({_id}, rest)
        const updatedGateway = await Gateway.findOne({_id}).populate("owner")

        res.status(200).send(updatedGateway)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

// const getgateways = async(req,res) => {
//     try {
//         const gateways = await Property.find().populate("owner")
//         res.status(200).send(gateways)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

const getOwnerGateway = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const gateways = await Gateway.find({owner}).populate("owner")
        res.status(200).send(gateways)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteGateway = async(req,res) => {
    try {
        const _id = req.query.id
        await Gateway.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    addGateway,
    updateGateway,
    getOwnerGateway,
    deleteGateway
}