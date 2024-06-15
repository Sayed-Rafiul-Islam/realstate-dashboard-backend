const mongoose = require("mongoose")
const Owner = require('./ownerModel')

const Schema = mongoose.Schema

const expenseTypeSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true
    }
})

const ExpenseType = mongoose.model("ExpenseType", expenseTypeSchema)

module.exports = ExpenseType

