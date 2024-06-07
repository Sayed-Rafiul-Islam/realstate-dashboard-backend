const Owner = require('../models/ownerModel')


const getOwners = async(req,res) => {
    try {
        const owners = await Owner.find().populate(["user","activePackage"])
        res.status(200).send(owners)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// export

module.exports = {
    getOwners
}