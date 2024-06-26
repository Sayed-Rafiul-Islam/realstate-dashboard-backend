const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Tenant = require("./tenantModel")
const Maintainer = require("./maintainerModel")
const User = require("./userModel")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    fromName : {
        type : String,
        required : false,
        default : "N/A"
    },
    fromRole : {
        type : String,
        required : true,
    },
    toName : {
        type : String,
        required : false,
        default : "N/A"
    },
    toRole : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true,
    },
    read : {
        type : Boolean,
        required : true,
    },
    date : {
        type : Date,
        required : true,
    },
    from : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true
    },
    to : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true
    },
    // images : {
    //     type : [ { url : String } ],
    //     required : false
    // },
    // sentBy : {
    //     type : String,
    //     required : true
    // },
    // maintainer : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Maintainer,
    //     required : false
    // },
    // tenant : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Tenant,
    //     required : false
    // },
    // owner : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Owner,
    //     required : true
    // }
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message

