const mongoose = require("mongoose")
const Property = require('./propertyModel')
const Unit = require('./unitModel')
const Maintainer = require('./maintainerModel')
const MaintainanceType = require('./maintainanceTypeModel')
const Owner = require('./ownerModel')

const Schema = mongoose.Schema

const maintainanceRequestSchema = new Schema({
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required : true
    },
    unit : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Unit,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    },
    type : {
        type: mongoose.Schema.Types.ObjectId,
        ref: MaintainanceType,
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
    status : {
        type : String,
        required : true
    },
    paymentStatus : {
        type : String,
        required : true,
        default : "Due"
    },
    details : {
        type : String,
        required : true
    },
    attachment : {
        type : String,
        required : true
    },
    // responsibility : {
    //     type : String,
    //     required : true,
    //     default : "Owner"
    // },
    // -------------------------------------------
    // optional info
    date : {
        type : Date,
        required : false,
        default : new Date()
    },
    requestNo : {
        type : String,
        required : false
    },
    maintainer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Maintainer,
        required : false,
    },
    issue : {
        type : String,
        required : false,
        default : '',
    },
    cost : {
        type : Number,
        required : false,
        default : 0,
    },
    invoice : {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: Invoice,
        type : String,
        required : false
    }
})

const MaintainanceRequest = mongoose.model("MaintainanceRequest", maintainanceRequestSchema)

module.exports = MaintainanceRequest

