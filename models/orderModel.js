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
    gateway : {
        type: String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    transactionId : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    }
})

const Order = mongoose.model("Order", order)

module.exports = Order

