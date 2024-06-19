const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Tenant = require("./tenantModel")
const Maintainer = require("./maintainerModel")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    text : {
        type : String,
        required : false
    },
    images : {
        type : [ { url : String } ],
        required : false
    },
    sentBy : {
        type : String,
        required : true
    },
    maintainer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Maintainer,
        required : false
    },
    tenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Tenant,
        required : false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message

