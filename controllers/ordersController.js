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
// const assignOwnerPackage = async(req,res) => {
//     try {
//         const data = req.body
//         const newOwnerPackage = await OwnerPackage.create(data)

//         res.status(200).send(newOwnerPackage)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
//   }

// export

module.exports = {
    getOwnerPackages,
    assignOwnerPackage
}