const Gateway = require('../models/gatewayModel')
const InvoiceType = require('../models/invoiceTypeModel')
const Invoice = require('../models/invoiceModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')
const Tenant = require('../models/tenantModel')
const Rent = require('../models/rentModel')


// const createInvoice = async(req,res) => {
//     try {
//         const body = req.body
//         const isTenant = await Tenant.find({property : body.property, unit : body.unit})
//         if (isTenant.length === 0) {
//             res.status(404).send()
//         } else {
//             const property = await Property.findOne({_id : body.property})
//             const unit = await Unit.findOne({_id : body.unit})
//             const type = await InvoiceType.findOne({_id : body.type})
            


//             const data = {
//                 ...body,
//                 propertyName : property.name,
//                 unitName : unit.name,
//                 typeName : type.title
//             }

//             if (data.status === "Paid") {
//                 const gateway = await Gateway.findOne({_id : body.gateway})
//                 data.gatewayName = gateway.title
//                 data.dueDate = ''
//                 const result = await Invoice.create(data)
//                 const newInvoice = await Invoice.findOne({_id : result._id}).populate(["gateway","property","unit","type",{
//                     path : "owner",
//                     populate : {
//                         path : "user"
//                     }
//                 }])

//                 // rent ------------------------------

//                 if (type.title === 'Rent') {
//                     const {dueDate,type,typeName,status,prefix,...rest} = data
//                     const rent = {...rest,tenantName : isTenant[0].name, tenant : isTenant[0]._id}
//                     const rentResult = await Rent.create(rent)
//                     const newRent = await Rent.findOne({_id : rentResult._id}).populate(["gateway","property","unit","tenant",{
//                         path : "owner",
//                         populate : {
//                             path : "user"
//                         }
//                     }])


//                     res.status(201).send({newInvoice,newRent})
//                 } else {
//                     res.status(200).send(newInvoice)
//                 }

                
//             } else {
//                 data.dateOfPayment = ''
//                 data.gateway = null
//                 data.gatewayName = ''
//                 data.transactionId = ''
//                 const result = await Invoice.create(data)
//                 const newInvoice = await Invoice.findOne({_id : result._id}).populate(["gateway","property","unit","type",{
//                     path : "owner",
//                     populate : {
//                         path : "user"
//                     }
//                 }])
//                 res.status(200).send(newInvoice)
//             }
//         }

        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
//   }


// const updateInvoice = async(req,res) => {
//     try {
//         const {_id,...body} = req.body
//         const isTenant = await Tenant.find({property : body.property, unit : body.unit})
//         if (isTenant.length === 0) {
//             res.status(404).send()
//         } else {
//             const property = await Property.findOne({_id : body.property})
//             const unit = await Unit.findOne({_id : body.unit})
//             const type = await InvoiceType.findOne({_id : body.type})
            


//             const data = {
//                 ...body,
//                 propertyName : property.name,
//                 unitName : unit.name,
//                 typeName : type.title
//             }

//             if (data.status === "Paid") {
//                 const gateway = await Gateway.findOne({_id : body.gateway})
//                 data.gatewayName = gateway.title
//                 data.dueDate = ''
//                 await Invoice.updateOne({_id},data)
//                 const updatedInvoice = await Invoice.findOne({_id}).populate(["gateway","property","unit","type",{
//                     path : "owner",
//                     populate : {
//                         path : "user"
//                     }
//                 }])
//                 res.status(200).send(updatedInvoice)
//             } else {
//                 data.dateOfPayment = ''
//                 data.gateway = null
//                 data.transactionId = ''
//                 data.gatewayName = ''
//                 await Invoice.updateOne({_id},data)
//                 const updatedInvoice = await Invoice.findOne({_id}).populate(["gateway","property","unit","type",{
//                     path : "owner",
//                     populate : {
//                         path : "user"
//                     }
//                 }])
//                 res.status(200).send(updatedInvoice)
//             }
//         }
        
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }


// const getTenantInvoices = async(req,res) => {
//     try {
//         const {property,unit} = req.query
//         const invoices = await Invoice.find({property,unit}).populate(["gateway","property","unit","type",{
//             path : "owner",
//             populate : {
//                 path : "user"
//             }
//         }])
//         res.status(200).send(invoices)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

const getRents = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const rents = await Rent.find({owner}).populate(["gateway","property","unit",{
            path : "tenant",
            populate : {
                path : "user"
            }
        },{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(rents)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const geTenantRents = async(req,res) => {
    try {
        const tenant = req.query.tenantId
        const rents = await Rent.find({tenant}).populate(["gateway","property","unit",{
            path : "tenant",
            populate : {
                path : "user"
            }
        },{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(rents)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteRent = async(req,res) => {
    try {
        const _id = req.query.id
        await Rent.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    getRents,
    deleteRent,
    geTenantRents
}