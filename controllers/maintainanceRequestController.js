const MaintainanceRequest = require('../models/maintainanceRequestModel')
const Notification = require('../models/notificaionModel')


const createRequest = async(req,res) => {
    try {
        const {propertyId,unitId,type,details,status,requestNo,attachment,paymentStatus} = req.body
        const newData = {
            propertyId,
            unitId,
            type,
            details,
            status,
            paymentStatus,
            attachment,
            date : new Date(),
            responsibility : "Tenant",
            requestNo,
            maintainerId : '',
            issue : '',
            cost : 0
        }
        const newRequest = await MaintainanceRequest.create(newData)

        // notification 
        const notification = {
            propertyId,
            unitId,
            issue : 'Maintainance Issue',
            body : details,
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
        const {propertyId,unitId,type,details,status,_id,attachment,paymentStatus} = req.body
            const updatedData = {
                propertyId,
                unitId,
                type,
                details,
                status,
                paymentStatus,
                attachment,
            }
            await MaintainanceRequest.updateOne({_id}, updatedData)

            const updatedRequest = await MaintainanceRequest.findOne({_id})

        res.status(200).send(updatedRequest)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const getRequests = async(req,res) => {
    try {
        const requests = await MaintainanceRequest.find()
        res.status(200).send(requests)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

// export

module.exports = {
    createRequest,
    updateRequest,
    getRequests
}