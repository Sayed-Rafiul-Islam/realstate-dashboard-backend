const Message = require('../models/messageModel')
const Notification = require('../models/notificaionModel')


const createMessage = async(req,res) => {
    try {
        const data = req.body
        const result = await Message.create(data)
        const newType = await Message.findOne({_id : result._id}).populate("owner")
        res.status(200).send(newType)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// const updateMessage = async(req,res) => {
//     try {
//         const {_id,...rest} = req.body
//         await Message.updateOne({_id}, rest)
//         const updatedType = await Message.findOne({_id}).populate("owner")

//         res.status(200).send(updatedType)
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }


const getOwnerMessage = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const types = await Message.find({owner}).populate("owner")
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}
const getTenantMessage = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const types = await Message.find({owner}).populate("owner")
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getMaintainerMessage = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const types = await Message.find({owner}).populate("owner")
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteMessage = async(req,res) => {
    try {
        const _id = req.query.id
        await Message.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createMessage,
    getTenantMessage,
    getMaintainerMessage,
    getOwnerMessage,
    deleteMessage
}