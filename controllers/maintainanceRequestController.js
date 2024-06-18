const Expense = require('../models/expenseModel')
const MaintainanceRequest = require('../models/maintainanceRequestModel')
const Maintainer = require('../models/maintainerModel')
const Notification = require('../models/notificaionModel')
const Property = require('../models/propertyModel')
const Unit = require('../models/unitModel')


const createRequest = async(req,res) => {
    try {
        const data = req.body
        const property = await Property.findOne({_id : data.property})
        const unit = await Unit.findOne({_id : data.unit})
        const request = {...data,propertyName : property.name, unitName : unit.name}
        const upload = await MaintainanceRequest.create(request)

        const newRequest = await MaintainanceRequest.findOne({_id : upload._id}).populate(["property","unit","type","maintainer","owner"])

        // notification 
        const notification = {
            propertyId : data.property,
            unitId : data.unit,
            issue : 'Maintainance Issue',
            body : data.details,
            date : new Date().toISOString()
        }
        const newNotification = await Notification.create(notification)


        res.status(200).send({newRequest,newNotification})
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateRequest = async(req,res) => {
    try {
        const {_id,...data} = req.body
        await MaintainanceRequest.updateOne({_id}, data)
        const updatedRequest = await MaintainanceRequest.findOne({_id}).populate(["property","unit","type","maintainer","owner"])

        if (updatedRequest.status === "Complete" && updatedRequest.paymentStatus === "Paid") {
            const expense = {
                name : "Maintainance",
                propertyName : updatedRequest.propertyName,
                unitName : updatedRequest.unitName,
                maintainerName : updatedRequest.maintainer.name,
                typeName : updatedRequest.type.type,
                amount : updatedRequest.cost,
                description : updatedRequest.details,
                date : new Date(),

                request : updatedRequest._id ,
                property : updatedRequest.property._id ,
                unit : updatedRequest.unit._id ,
                owner : updatedRequest.owner._id ,
                maintainer : updatedRequest.maintainer._id
            }
            await Expense.create(expense)
        } 
        res.status(200).send(updatedRequest)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getOwnerRequests = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const requests = await MaintainanceRequest.find({owner}).populate(["property","unit","type","maintainer","owner"])
        res.status(200).send(requests)
    } catch (error) {

        console.log(error)
        res.status(500).send({error})
    }
}

const getMaintainerRequests = async(req,res) => {
    try {
        const maintainer = req.query.maintainerId
        const requests = await MaintainanceRequest.find({maintainer}).populate(["property","unit","type","maintainer","owner"])
        res.status(200).send(requests)
    } catch (error) {
        console.log("here")
        console.log(error)
        res.status(500).send({error})
    }
}

const getTenantRequests = async(req,res) => {
    try {
        const property = req.query.propertyId
        const unit = req.query.unitId
        const requests = await MaintainanceRequest.find({property,unit}).populate(["property","unit","type","maintainer","owner"])
        res.status(200).send(requests)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getRequests = async(req,res) => {
    try {
        const requests = await MaintainanceRequest.find().populate(["property","unit","type","maintainer","owner"])
        res.status(200).send(requests)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteRequest = async(req,res) => {
    try {
        const _id = req.query.id
        await MaintainanceRequest.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    createRequest,
    updateRequest,
    getRequests,
    getOwnerRequests,
    deleteRequest,
    getMaintainerRequests,
    getTenantRequests
}