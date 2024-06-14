const router = require('express').Router()
const { createRequest, getRequests, updateRequest, getOwnerRequests, deleteRequest, getMaintainerRequests, getTenantRequests } = require('../controllers/maintainanceRequestController')

router.post('/createRequest', createRequest )
router.patch('/updateRequest', updateRequest )
router.get('/getRequests', getRequests )
router.get('/getOwnerRequests', getOwnerRequests )
router.get('/getMaintainerRequests', getMaintainerRequests )
router.get('/getTenantRequests', getTenantRequests )
router.delete('/deleteRequest', deleteRequest )


module.exports = router