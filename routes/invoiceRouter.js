const { createInvoice, deleteInvoice, getOwnerInvoice, updateInvoice } = require('../controllers/invoiceController')


const router = require('express').Router()

router.post('/createInvoice', createInvoice )
router.patch('/updateInvoice', updateInvoice )
router.get('/getOwnerInvoice', getOwnerInvoice )
router.delete('/deleteInvoice', deleteInvoice )


module.exports = router