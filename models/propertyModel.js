const mongoose = require("mongoose")
const Owner = require('./ownerModel')
const Package = require('./packageModel')

const Schema = mongoose.Schema

const propertySchema = new Schema({
    name : {
        type: String,
        required : true
    },
    unitCount : {
        type: Number,
        required : true
    },
    coverImage : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
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
    rent : {
        type: Number,
        required : true
    },
    deposit : {
        type: Number,
        required : true
    },
    lateFee : {
        type: Number,
        required : true
    },
    rentType : {
        type: String,
        required : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Owner,
        required : true,
    }
})

const Property = mongoose.model("Property", propertySchema)

module.exports = Property

// propertyName : z.string().min(1, {message : "Label Required"}),
// unitCount : z.coerce.number().min(1, {message : "Unit Required"}),
// description : z.string().min(1, {message : "Description Required"}),
// image : z.string().min(1, {message : "Image Required"}),
// address : z.string().min(1, {message : "Address Required"}),
// city : z.string().min(1, {message : "City Required"}),
// state : z.string().min(1, {message : "State Required"}),
// country : z.string().min(1, {message : "Country Required"}),
// postCode : z.string().min(1, {message : "Postal Code Required"})
// rent : z.coerce.number().min(1),
// deposit : z.coerce.number().min(1),
// lateFee : z.coerce.number().min(1),
// rentType : z.string().min(1)

