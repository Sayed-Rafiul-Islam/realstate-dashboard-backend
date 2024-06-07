const mongoose = require("mongoose")

const Schema = mongoose.Schema

const packageSchema = new Schema({
    label : {
        type : String,
        required : true
    },
    monthlyPrice : {
        type : Number,
        required : true
    },
    yearlyPrice : {
        type : Number,
        required : false
    },
    maxProperty : {
        type : Number,
        required : true
    },
    maxUnit : {
        type : Number,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    trial : {
        type : Boolean,
        required : true
    }
})

const Package = mongoose.model("Package", packageSchema)

module.exports = Package

