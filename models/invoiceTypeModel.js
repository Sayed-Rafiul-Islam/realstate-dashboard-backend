const mongoose = require("mongoose")
const Owner = require('./ownerModel')

const Schema = mongoose.Schema

const invoiceTypeSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    tax : {
        type : Number,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const InvoiceType = mongoose.model("InvoiceType", invoiceTypeSchema)

module.exports = InvoiceType

