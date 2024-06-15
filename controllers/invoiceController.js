const Gateway = require('../models/gatewayModel')
const InvoiceType = require('../models/invoiceTypeModel')
const Invoice = require('../models/invoiceModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')


const createInvoice = async(req,res) => {
    try {
        const body = req.body
        const property = await Property.findOne({_id : body.property})
        const unit = await Unit.findOne({_id : body.unit})
        const type = await InvoiceType.findOne({_id : body.type})
        


        const data = {
            ...body,
            propertyName : property.name,
            unitName : unit.name,
            typeName : type.title
        }

        if (data.status === "Paid") {
            const gateway = await Gateway.findOne({_id : body.gateway})
            data.gatewayName = gateway.title
            data.dueDate = ''
            const result = await Invoice.create(data)
            const newInvoice = await Invoice.findOne({_id : result._id}).populate(["gateway","property","unit","type",{
                path : "owner",
                populate : {
                    path : "user"
                }
            }])
            res.status(200).send(newInvoice)
        } else {
            data.dateOfPayment = ''
            data.gateway = null
            data.gatewayName = ''
            data.transactionId = ''
            const result = await Invoice.create(data)
            const newInvoice = await Invoice.findOne({_id : result._id}).populate(["gateway","property","unit","type",{
                path : "owner",
                populate : {
                    path : "user"
                }
            }])
            res.status(200).send(newInvoice)
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateInvoice = async(req,res) => {
    try {
        const {_id,...body} = req.body
        const property = await Property.findOne({_id : body.property})
        const unit = await Unit.findOne({_id : body.unit})
        const type = await InvoiceType.findOne({_id : body.type})
        


        const data = {
            ...body,
            propertyName : property.name,
            unitName : unit.name,
            typeName : type.title
        }

        if (data.status === "Paid") {
            const gateway = await Gateway.findOne({_id : body.gateway})
            data.gatewayName = gateway.title
            data.dueDate = ''
            await Invoice.updateOne({_id},data)
            const updatedInvoice = await Invoice.findOne({_id}).populate(["gateway","property","unit","type",{
                path : "owner",
                populate : {
                    path : "user"
                }
            }])
            res.status(200).send(updatedInvoice)
        } else {
            data.dateOfPayment = ''
            data.gateway = null
            data.transactionId = ''
            data.gatewayName = ''
            await Invoice.updateOne({_id},data)
            const updatedInvoice = await Invoice.findOne({_id}).populate(["gateway","property","unit","type",{
                path : "owner",
                populate : {
                    path : "user"
                }
            }])
            res.status(200).send(updatedInvoice)
        }
        
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

const getOwnerInvoice = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const invoices = await Invoice.find({owner}).populate(["gateway","property","unit","type",{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(invoices)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteInvoice = async(req,res) => {
    try {
        const _id = req.query.id
        await Invoice.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createInvoice,
    updateInvoice,
    getOwnerInvoice,
    deleteInvoice
}