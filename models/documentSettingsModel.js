const mongoose = require("mongoose")
const Owner = require('./ownerModel')

const Schema = mongoose.Schema

const documentSettingsSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const DocumentSettings = mongoose.model("DocumentSettings", documentSettingsSchema)

module.exports = DocumentSettings

