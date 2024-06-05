const mongoose = require("mongoose")

const Schema = mongoose.Schema

const maintainanceRequestSchema = new Schema({
    propertyId : {
        type : String,
        required : true
    },
    unitId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : false
    },
    status : {
        type : String,
        required : true
    },
    paymentStatus : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    attachment : {
        type : String,
        required : true
    },
    responsibility : {
        type : String,
        required : true
    },
    // -------------------------------------------
    // optional info
    date : {
        type : Date,
        required : false
    },
    requestNo : {
        type : String,
        required : false
    },
    maintainerId : {
        type : String,
        required : false
    },
    issue : {
        type : String,
        required : false
    },
    cost : {
        type : Number,
        required : false
    }
})

const MaintainanceRequest = mongoose.model("MaintainanceRequest", maintainanceRequestSchema)

module.exports = MaintainanceRequest

