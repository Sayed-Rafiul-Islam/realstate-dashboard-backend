const User = require("../models/userModel")

const varify = async (req,res) => {
    const email = req.user.email

    const user = await User.findOne({ email})
    // console.log(user)
    
    res.status(200).send(user)  

}

const getAccessLevel = async (req,res) => {

}

module.exports = {
    varify,
    getAccessLevel
}