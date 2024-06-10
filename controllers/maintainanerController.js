const MaintainanceRequest = require('../models/maintainanceRequestModel')
const MaintainanceType = require('../models/maintainanceTypeModel')
const Maintainer = require('../models/maintainerModel')
const User = require('../models/userModel')
const { createAccount } = require('./userController')


const createMaintainer = async(req,res) => {
    try {
        const {email,password,contactNo,...data} = req.body
        const isUser = await createAccount(email,password,'maintainer')
        if (isUser) {
            await User.updateOne({
                email,
            }, {
                contactNo,
            })

            const user = await User.findOne({email})

            const maintainer = {...data,user : user._id}
            const result = await Maintainer.create(maintainer)
            const newMaintainer = await Maintainer.findOne({_id : result._id}).populate(["type","owner","user"])
            res.status(200).send(newMaintainer)
        } else {
            res.status(400).send({message : "Email already in use"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// const updateMaintainanceType = async(req,res) => {
//     try {
//         const {_id,...update} = req.body
//         await MaintainanceType.updateOne({_id}, update)
//         const updatedType = await MaintainanceType.findOne({_id})
//         res.status(200).send(updatedType)
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
//   }

// const getMaintainaceType = async(req,res) => {
//     try {
//         const owner = req.query.id
//         const types = await MaintainanceType.find({owner}).populate("owner")
//         res.status(200).send(types)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

// const deleteMaintainanceType = async(req,res) => {
//     try {
//         const _id = req.query.id
        // const ownerId = req.query.ownerId
        // const propertyId = req.query.propertyId
    
        // const isTenant = await Tenant.findOne({unit : _id})

        // if (isTenant) {
        //     res.status(400).json()
        // } else {
        //     await Unit.deleteOne({_id})
        //     await Owner.updateOne({_id : ownerId},{$inc : {unitCount : -1}})
        //     await Property.updateOne({_id : propertyId},{$inc : {unitCount : -1}})
        //     const updatedOwner = await Owner.findOne({_id : ownerId}).populate(["user","activePackage"])
        //     const updatedProperty = await Property.findOne({_id : propertyId}).populate("owner")
        //     res.status(200).json({updatedOwner,updatedProperty})
        // }
        
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

// export

module.exports = {
    createMaintainer
}