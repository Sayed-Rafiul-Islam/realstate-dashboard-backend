const MaintainanceRequest = require('../models/maintainanceRequestModel')


const createRequest = async(req,res) => {
    try {
        const {propertyId,unitId,type,details,status,requestNo,attachment} = req.body
        const newData = {
            propertyId,
            unitId,
            type,
            details,
            status,
            attachment,
            date : new Date(),
            requestNo,
            maintainerId : '',
            issue : '',
            cost : 0
        }
        const newRequest = await MaintainanceRequest.create(newData)
        res.status(200).send(newRequest)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const updateRequest = async(req,res) => {
    try {
        const {propertyId,unitId,type,details,status,_id,attachment} = req.body
            const updatedData = {
                propertyId,
                unitId,
                type,
                details,
                status,
                attachment,
            }
            await MaintainanceRequest.updateOne({_id}, updatedData)

            const updatedRequest = await MaintainanceRequest.findOne({_id})

        res.status(200).send(updatedRequest)
        
        // const newRequest = await MaintainanceRequest.create(newData)
        // res.status(200).send('hi')
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