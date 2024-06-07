const mongoose = require("mongoose")
const User = require('./userModel')
const Package = require('./packageModel')

const Schema = mongoose.Schema

const ownerSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    propertyCount : {
        type : Number,
        required : true,
    },
    unitCount : {
        type : Number,
        required : true
    },
    activePackage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Package,
        required : false
    },
})

const Owner = mongoose.model("Owner", ownerSchema)

module.exports = Owner

