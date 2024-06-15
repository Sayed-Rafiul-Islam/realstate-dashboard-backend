const { addInvoiceType, updateInvoiceType, getOwnerInvoiceType, deleteInvoiceType } = require('../controllers/invoiceTypeController')

const router = require('express').Router()

router.post('/addInvoiceType', addInvoiceType )
router.patch('/updateInvoiceType', updateInvoiceType )
router.get('/getOwnerInvoiceType', getOwnerInvoiceType )
router.delete('/deleteInvoiceType', deleteInvoiceType )


module.exports = router