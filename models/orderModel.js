const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Package = require('./packageModel')

const Schema = mongoose.Schema

const order = new Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    },
    pack : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Package,
        required : true
    },
    monthly : {
        type: Boolean,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    orderDate : {
        type : Date,
        required : true
    },
    dateOfPayment : {
        type : Date,
        required : false
    },
    gateway : {
        type: String,
        required : false
    },
    transactionId : {
        type : String,
        required : false
    },
})

const Order = mongoose.model("Order", order)

module.exports = Order

