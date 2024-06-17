const { getRents, deleteRent } = require('../controllers/rentController')

const router = require('express').Router()

// router.post('/createInvoice', createInvoice )
// router.patch('/updateInvoice', updateInvoice )
router.get('/getRents', getRents )
// router.get('/getTenantInvoices', getTenantInvoices )
router.delete('/deleteRent', deleteRent )


module.exports = router