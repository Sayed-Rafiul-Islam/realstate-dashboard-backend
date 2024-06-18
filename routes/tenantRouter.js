const { createTenant, getTenants, updateTenant, deleteTenant, getOwnerTenants, getTenant } = require('../controllers/tenantController')

const router = require('express').Router()

router.get('/getTenants', getTenants)
router.get('/getOwnerTenants', getOwnerTenants)
router.get('/getTenant', getTenant)
router.patch('/updateTenant', updateTenant )
router.post('/createTenant', createTenant )
router.delete('/deleteTenant', deleteTenant )



module.exports = router