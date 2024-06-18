const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Property = require("./propertyModel")
const Unit = require("./unitModel")
const Maintainer = require("./maintainerModel")
const MaintainanceRequest = require("./maintainanceRequestModel")

const Schema = mongoose.Schema

const expenseSchema = new Schema({

    name : {
        type: String,
        required : true
    },
    propertyName : {
        type: String,
        required : true
    },
    unitName : {
        type: String,
        required : true
    },
    maintainerName : {
        type: String,
        required : true
    },
    typeName : {
        type: String,
        required : true
    },
    amount : {
        type: Number,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    date : {
        type : Date,
        require : true
    },

    // --------------------------------------------
    request : {
        type: mongoose.Schema.Types.ObjectId,
        ref: MaintainanceRequest,
        required : true,
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
    maintainer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Maintainer,
        required : true,
    }
})

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense

