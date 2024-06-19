const { getOrders, getOwnerOrder, addOrder, deleteOrder, updateOrder, cancelOrder } = require('../controllers/ordersController')


const router = require('express').Router()

router.get('/getOrders', getOrders )
router.get('/getOwnerOrder', getOwnerOrder )
router.post('/addOrder', addOrder )
router.delete('/deleteOrder', deleteOrder )
router.patch('/updateOrder', updateOrder )
router.patch('/cancelOrder', cancelOrder )


module.exports = router