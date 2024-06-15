const { createInvoice, deleteInvoice, getOwnerInvoice, updateInvoice, getTenantInvoices } = require('../controllers/invoiceController')


const router = require('express').Router()

router.post('/createInvoice', createInvoice )
router.patch('/updateInvoice', updateInvoice )
router.get('/getOwnerInvoice', getOwnerInvoice )
router.get('/getTenantInvoices', getTenantInvoices )
router.delete('/deleteInvoice', deleteInvoice )


module.exports = router