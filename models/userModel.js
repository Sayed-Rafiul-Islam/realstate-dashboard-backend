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
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User

