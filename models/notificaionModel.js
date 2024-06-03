const mongoose = require("mongoose")

const Schema = mongoose.Schema

const notificaionSchema = new Schema({
    propertyId : {
        type : String,
        required : true
    },
    unitId : {
        type : String,
        required : true
    },
    issue : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
})

const Notification = mongoose.model("Notification", notificaionSchema)

module.exports = Notification

