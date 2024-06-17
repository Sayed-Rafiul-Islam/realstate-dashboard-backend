const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Property = require("./propertyModel")
const Unit = require("./unitModel")
const Gateway = require("./gatewayModel")
const Tenant = require("./tenantModel")

const Schema = mongoose.Schema

const rentSchema = new Schema({

    propertyName : {
        type: String,
        required : true
    },
    unitName : {
        type: String,
        required : true
    },
    tenantName : {
        type: String,
        required : true
    },
    gatewayName : {
        type: String,
        required : true
    },
    invoiceNo : {
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
    dateOfPayment : {
        type : Date,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    transactionId : {
        type : String,
        required : true
    },
    gateway : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Gateway,
        required : true,
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
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    },
    tenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Tenant,
        required : true,
    }
})

const Rent = mongoose.model("Rent", rentSchema)

module.exports = Rent

