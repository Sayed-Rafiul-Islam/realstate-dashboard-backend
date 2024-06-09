const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const User = require('./userModel')
const Property = require('./propertyModel')
const Unit = require('./unitModel')

const Schema = mongoose.Schema

const tenantSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    age : {
        type: Number,
        required : false
    },
    occupation : {
        type: String,
        required : false
    },
    familyMembers : {
        type: Number,
        required : false
    },
    address : {
        type: String,
        required : true
    },
    city : {
        type: String,
        required : true
    },
    state : {
        type: String,
        required : true
    },
    country : {
        type: String,
        required : true
    },
    postCode : {
        type: String,
        required : true
    },
    status : {
        type: Boolean,
        required : true
    },
    due : {
        type: Number,
        required : false
    },
    startDate : {
        type: Date,
        required : true
    },
    endDate : {
        type: Date,
        required : true
    },
    personalDoc : {
        type: String,
        required : true
    },
    propertyDoc : {
        type: String,
        required : true
    },
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required : true,
    },
    unit : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Unit,
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

const Tenant = mongoose.model("Tenant", tenantSchema)

module.exports = Tenant


// image : string,
// email : string,
// phone : string,
// occupation : string,
// startDate : string,
// endDate : string,
// dueDate : string,
// address : string,
// city : string,
// state : string,
// country : string,
// postalCode : string,
// NID : number,
// due : number,
// age : number,
// familyMember : number,
// status : boolean,       
// personalDoc : string,
// propertyDoc : string


