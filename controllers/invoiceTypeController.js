const InvoiceType = require('../models/invoiceTypeModel')


const addInvoiceType = async(req,res) => {
    try {
        const data = req.body
        const result = await InvoiceType.create(data)
        const newType = await InvoiceType.findOne({_id : result._id}).populate("owner")
        res.status(200).send(newType)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateInvoiceType = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await InvoiceType.updateOne({_id}, rest)
        const updatedType = await InvoiceType.findOne({_id}).populate("owner")

        res.status(200).send(updatedType)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

// const gettypes = async(req,res) => {
//     try {
//         const types = await Property.find().populate("owner")
//         res.status(200).send(types)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

const getOwnerInvoiceType = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const types = await InvoiceType.find({owner}).populate("owner")
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteInvoiceType = async(req,res) => {
    try {
        const _id = req.query.id
        await InvoiceType.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    addInvoiceType,
    updateInvoiceType,
    getOwnerInvoiceType,
    deleteInvoiceType
}