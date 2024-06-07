const mongoose = require("mongoose")
const User = require('./userModel')

const Schema = mongoose.Schema

const ownerSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    }
})

const Owner = mongoose.model("Owner", ownerSchema)

module.exports = Owner

