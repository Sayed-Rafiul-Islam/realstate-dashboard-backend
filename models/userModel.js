const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    pass_word : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : false
    },

    // -------------------------------------------
    // optional info

    firstName : {
        type : String,
        required : false
    },
    lastName : {
        type : String,
        required : false
    },
    contactNo : {
        type : String,
        required : false
    },
    NID : {
        type : String,
        required : false
    },
    birthDate : {
        type : String,
        required : false
    },
    imageUrl : {
        type : String,
        required : false
    },

    // -------------------------------
    // print details

    printName : {
        type : String,
        required : false
    },
    printAddress : {
        type : String,
        required : false
    },
    printContact : {
        type : String,
        required : false
    },
    printLogo : {
        type : String,
        required : false
    },
})

const User = mongoose.model("User", userSchema)

module.exports = User

