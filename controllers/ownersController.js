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

const updateOwner = async(req,res) => {
    try {
        const {_id,...rest} = req.body
        await Owner.updateOne({_id}, rest)
        const updatedOwner = await Owner.findOne({_id})
        res.status(200).send(updatedOwner)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// export

module.exports = {
    getOwners,
    updateOwner
}