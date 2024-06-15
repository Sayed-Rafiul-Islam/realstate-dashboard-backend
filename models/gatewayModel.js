const mongoose = require("mongoose")
const Owner = require('./ownerModel')

const Schema = mongoose.Schema

const gatewaySchema = new Schema({
    title : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true
    },
    mode : {
        type : String,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const Gateway = mongoose.model("Gateway", gatewaySchema)

module.exports = Gateway

