const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')
const { createAccount } = require('./userController')


const createTenant = async(req,res) => {
    try {
        const {email,pass_word,contactNo,NID,image,...data} = req.body
        const isUser = await createAccount(email,pass_word,'tenant')
        if (isUser) {
            await User.updateOne({
                email,
            }, {
                contactNo : contactNo,
                NID : NID,
                imageUrl : image,
            })

            const user = await User.findOne({email})

            const tenant = {...data,user : user._id}
            const result = await Tenant.create(tenant)
            const newTenant = await Tenant.findOne({_id : result._id}).populate(["property","unit","owner","user"])
            res.status(200).send(newTenant)
        } else {
            res.status(400).send({message : "Email already in use"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const updateTenant = async(req,res) => {
    try {
        const {_id,email,contactNo,NID,image,...data} = req.body

            await User.updateOne({
                email,
            }, {
                contactNo : contactNo,
                NID : NID,
                imageUrl : image,
            })

            const user = await User.findOne({email})

            const update = {...data,user : user._id}
            await Tenant.updateOne({_id},update)
            const updatedTenant = await Tenant.findOne({_id}).populate(["property","unit","owner","user"])
            res.status(200).send(updatedTenant)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getTenants = async(req,res) => {
    try {
        const tenants = await Tenant.find().populate(["property","unit","owner","user"])
        res.status(200).send(tenants)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const deleteTenant = async(req,res) => {
    try {
        const _id = req.query.id
        await Tenant.deleteOne({_id})
        res.status(200).json({message : "Tenant removed."})
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createTenant,
    getTenants,
    updateTenant,
    deleteTenant
}