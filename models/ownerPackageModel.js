const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Package = require('./packageModel')

const Schema = mongoose.Schema

const ownerPackageSchema = new Schema({
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
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    }
})

const OwnerPackage = mongoose.model("OwnerPackage", ownerPackageSchema)

module.exports = OwnerPackage

