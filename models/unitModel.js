const mongoose = require("mongoose")
const Property = require('./propertyModel')

const Schema = mongoose.Schema

const unitSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    bedrooms : {
        type: Number,
        required : true
    },
    washrooms : {
        type: Number,
        required : true
    },
    kitchens : {
        type: Number,
        required : true
    },
    squareFeet : {
        type: Number,
        required : true
    },
    condition : {
        type: String,
        required : true
    },
    image : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required : true,
    },
    // tenant : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Tenant,
    //     required : false,
    // }
})



const Unit = mongoose.model("Unit", unitSchema)

module.exports = Unit

