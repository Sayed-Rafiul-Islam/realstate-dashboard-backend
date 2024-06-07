const OwnerPackage = require('../models/ownerPackageModel')


const getOwnerPackages = async(req,res) => {
    try {
        const ownerPackages = await OwnerPackage.find().populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(ownerPackages)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}
const assignOwnerPackage = async(req,res) => {
    try {
        const data = req.body
        const newOwnerPackage = await OwnerPackage.create(data)

        res.status(200).send(newOwnerPackage)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// export

module.exports = {
    getOwnerPackages,
    assignOwnerPackage
}