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
            const newMaintainer = await Maintainer.findOne({_id : result._id}).populate(["type","user","property",{
                path : "owner",
                populate : {
                    path : "user"
                }
            }])
            res.status(200).send(newMaintainer)
        } else {
            res.status(400).send({message : "Email already in use"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateMaintainer = async(req,res) => {
    try {
        const {_id,...update} = req.body
        await Maintainer.updateOne({_id}, update)
        const updatedMaintainer = await MaintainanceType.findOne({_id}).populate(["type","user","property",{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(updatedMaintainer)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getOwnerMaintainers = async(req,res) => {
    try {
        const owner = req.query.id
        const maintainers = await Maintainer.find({owner}).populate(["user","type","property",{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(maintainers)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getMaintainers = async(req,res) => {
    try {
        const maintainers = await Maintainer.find().populate(["user","type","property",{
            path : "owner",
            populate : {
                path : "user"
            }
        }])
        res.status(200).send(maintainers)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteMaintainer = async(req,res) => {
    try {
        const _id = req.query.id
        const maintainer = await Maintainer.findOne({_id})
        await Maintainer.deleteOne({_id})
        await User.deleteOne({_id : maintainer.user})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createMaintainer,
    getOwnerMaintainers,
    getMaintainers,
    updateMaintainer,
    deleteMaintainer
}