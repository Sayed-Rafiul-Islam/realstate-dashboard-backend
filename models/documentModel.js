const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Tenant = require("./tenantModel")
const Maintainer = require("./maintainerModel")
const DocumentSettings = require("./documentSettingsModel")

const Schema = mongoose.Schema

const documentSchema = new Schema({
    tenantName : {
        type : String,
        required : false
    },
    maintainerName : {
        type : String,
        required : false
    },
    propertyName : {
        type : String,
        required : true
    },
    unitName : {
        type : String,
        required : true
    },
    typeName : {
        type : String,
        required : true
    },
    docFront : {
        type : String,
        required : true
    },
    docBack : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    tenant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Tenant,
        required : false
    },
    maintainer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Maintainer,
        required : false
    },
    type : {
        type: mongoose.Schema.Types.ObjectId,
        ref: DocumentSettings,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const Document = mongoose.model("Document", documentSchema)

module.exports = Document

