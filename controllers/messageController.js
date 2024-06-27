const Maintainer = require('../models/maintainerModel')
const Message = require('../models/messageModel')
const Notification = require('../models/notificaionModel')
const Owner = require('../models/ownerModel')
const Tenant = require('../models/tenantModel')

// for owners-----------------------------
const createMessage = async(req,res) => {
    try {
        const {all,...data} = req.body
        if (all) {
            const owner = await Owner.findOne(({_id : data.from}))
            if (data.toRole === 'tenant') {
                const tenants = await Tenant.find({owner : owner._id})
             
                tenants.map( async (tenant) => {
                    data.toName = tenant.name
                    data.to = tenant.user
                    data.from = owner.user

                    await Message.create(data)
                })

                const messages = await Message.find({from : owner.user})
                res.status(201).send(messages)
            } else {
                const maintainers = await Maintainer.find({owner : data.from})

                maintainers.map( async (maintainer) => {
                    data.toName = maintainer.name
                    data.to = maintainer.user
                    data.from = owner.user

                    await Message.create(data)
                })

                const messages = await Message.find({from : owner.user})
                res.status(201).send(messages)
            }

        } else {
            const result = await Message.create(data)
            const message = await Message.findOne({_id : result._id}).populate(["from","to"])
            res.status(200).send(message)
        }
     
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}


// for admin---------------------------------
const createAdminMessage = async (req,res) => {
    try {
        const {all,...data} = req.body

        const owners = await Owner.find().populate("user")

        if (all) {
            owners.map( async (owner) => {
                data.toName = owner.user.firstName ? `${owner.user.firstName} ${owner.user.lastName}` : owner.user.lastName
                data.to = owner.user._id
                await Message.create(data)
            })
    
            const messages = await Message.find({from : data.from})
            res.status(201).send(messages)
        } else {
            console.log(data)
            const result = await Message.create(data)
            const message = await Message.findOne({_id : result._id}).populate(["from","to"])
            res.status(200).send(message)
        }
     
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }

}

// for all ------------------------------------
const viewMessage = async(req,res) => {
    try {
        const {_id} = req.body
        await Message.updateOne({_id}, {read : true})
        const updatedMessage = await Message.findOne({_id}).populate(["from","to"])
        res.status(200).send(updatedMessage)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getMessages = async(req,res) => {
    try {
        const id = req.query.id
        const messages = await Message.find({to : id}).populate(["from","to"])
        res.status(200).send(messages)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getSentMessages = async(req,res) => {
    try {
        const id = req.query.id
        const messages = await Message.find({from : id}).populate(["from","to"])
        res.status(200).send(messages)
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
    getMessages,
    getSentMessages,
    deleteMessage,
    viewMessage,
    createAdminMessage
}