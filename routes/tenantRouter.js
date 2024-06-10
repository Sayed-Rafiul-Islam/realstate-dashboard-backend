const { createTenant, getTenants, updateTenant, deleteTenant, getOwnerTenants } = require('../controllers/tenantController')

const router = require('express').Router()

router.get('/getTenants', getTenants)
router.get('/getOwnerTenants', getOwnerTenants)
router.patch('/updateTenant', updateTenant )
router.post('/createTenant', createTenant )
router.delete('/deleteTenant', deleteTenant )



module.exports = router