const mongoose = require("mongoose")
const User = require('./userModel')
const MaintainanceType = require("./maintainanceTypeModel")
const Owner = require("./ownerModel")
const Property = require("./propertyModel")

const Schema = mongoose.Schema

const maintainerSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    status : {
        type: String,
        required : true,
        default : "Available"
    },
    pendingRequest : {
        type: Number,
        required : true,
        default : 0
    },
    age : {
        type: Number,
        required : false,
        default : 20
    },
    address : {
        type: String,
        required : false,
        default : ""
    },
    city : {
        type: String,
        required : false,
        default : ""
    },
    state : {
        type: String,
        required : false,
        default : ""
    },
    country : {
        type: String,
        required : false,
        default : ""
    },
    postCode : {
        type: String,
        required : false,
        default : ''
    },
    type : {
        type: mongoose.Schema.Types.ObjectId,
        ref: MaintainanceType,
        required : true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true,
    },
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required : true,
    },
})

const Maintainer = mongoose.model("Maintainer", maintainerSchema)

module.exports = Maintainer


