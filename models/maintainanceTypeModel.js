const mongoose = require("mongoose")
const Owner = require('./ownerModel')


const Schema = mongoose.Schema

const maintainanceTypeSchema = new Schema({
    type : {
        type: String,
        required : true
    },
    maintainer : {
        type: String,
        required : true
    },
    date : {
        type: Date,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    }
})

const MaintainanceType = mongoose.model("MaintainanceType", maintainanceTypeSchema)

module.exports = MaintainanceType


