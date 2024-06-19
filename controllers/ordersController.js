const Order = require('../models/orderModel')


const getOrders = async(req,res) => {
    try {
        const orders = await Order.find().populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const getOwnerOrder = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const orders = await Order.find({owner}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const addOrder = async(req,res) => {
    try {
        const data = req.body
        const result = await Order.create(data)
        const newOrder = await Order.findOne({_id : result._id}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).send(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}


const updateOrder = async(req,res) => {
    try {
        const {_id,...data} = req.body
        if (data.status === "Pending") {
            data.dateOfPayment = null
            data.gateway = '',
            data.transactionId = ''
            await Order.updateOne({_id}, data)
            const updatedOrder = await Order.findOne({_id}).populate([{
                path : "owner",
                populate : {
                    path : "user"
                }
            },"pack"])
            res.status(200).send(updatedOrder)
        } else {
            
            await Order.updateOne({_id}, data)
            const updatedOrder = await Order.findOne({_id}).populate([{
                path : "owner",
                populate : {
                    path : "user"
                }
            },"pack"])
            res.status(200).send(updatedOrder)
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
  }

const deleteOrder = async(req,res) => {
    try {
        const _id = req.query.id
        await Order.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

const cancelOrder = async(req,res) => {
    try {
        const _id = req.query.id
        await Order.updateOne({_id}, {status : "Canceled"})
        const canceledOrder = await Order.findOne({_id}).populate([{
            path : "owner",
            populate : {
                path : "user"
            }
        },"pack"])
        res.status(200).json(canceledOrder)
    } catch (error) {
        res.status(500).send(error)
    }
}
// export

module.exports = {
    getOrders,
    getOwnerOrder,
    addOrder,
    deleteOrder,
    updateOrder,
    cancelOrder
}