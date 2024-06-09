const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Package = require('./packageModel')

const Schema = mongoose.Schema

const propertySchema = new Schema({
    name : {
        type: String,
        required : true
    },
    unitCount : {
        type: Number,
        required : true
    },
    coverImage : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    address : {
        type: String,
        required : true
    },
    city : {
        type: String,
        required : true
    },
    state : {
        type: String,
        required : true
    },
    country : {
        type: String,
        required : true
    },
    postCode : {
        type: String,
        required : true
    },
    rent : {
        type: Number,
        required : true
    },
    deposit : {
        type: Number,
        required : true
    },
    lateFee : {
        type: Number,
        required : true
    },
    rentType : {
        type: String,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    }
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property



