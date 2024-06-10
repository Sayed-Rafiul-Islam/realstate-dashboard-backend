const mongoose = require("mongoose")
const User = require('./userModel')
const MaintainanceType = require("./maintainanceTypeModel")
const Owner = require("./ownerModel")

const Schema = mongoose.Schema

const maintainerSchema = new Schema({
    name : {
        type: String,
        required : true
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
    }
})

const Maintainer = mongoose.model("Maintainer", maintainerSchema)

module.exports = Maintainer


