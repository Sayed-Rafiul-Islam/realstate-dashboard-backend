const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Property = require("./propertyModel")
const Unit = require("./unitModel")
const InvoiceType = require("./invoiceTypeModel")
const Gateway = require("./gatewayModel")

const Schema = mongoose.Schema

const invoiceSchema = new Schema({

    propertyName : {
        type: String,
        required : true
    },
    unitName : {
        type: String,
        required : true
    },
    typeName : {
        type: String,
        required : true
    },
    gatewayName : {
        type: String,
        required : false
    },
    invoiceNo : {
        type: String,
        required : true
    },
    prefix : {
        type: String,
        required : true
    },
    month : {
        type: String,
        required : true
    },
    amount : {
        type: Number,
        required : true
    },
    status : {
        type: String,
        required : true
    },
    dueDate : {
        type : Date,
        required : false
    },
    dateOfPayment : {
        type : Date,
        required : false
    },
    description : {
        type : String,
        required : false
    },
    transactionId : {
        type : String,
        required : false
    },
    gateway : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Gateway,
        required : false,
    },
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required : true,
    },
    unit : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Unit,
        required : true,
    },
    type : {
        type: mongoose.Schema.Types.ObjectId,
        ref: InvoiceType,
        required : true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    }
})

const Invoice = mongoose.model("Invoice", invoiceSchema)

module.exports = Invoice

