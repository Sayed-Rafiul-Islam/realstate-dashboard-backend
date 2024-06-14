const router = require('express').Router()
const { createRequest, getRequests, updateRequest, getOwnerRequests, deleteRequest } = require('../controllers/maintainanceRequestController')

router.post('/createRequest', createRequest )
router.patch('/updateRequest', updateRequest )
router.get('/getRequests', getRequests )
router.get('/getOwnerRequests', getOwnerRequests )
router.delete('/deleteRequest', deleteRequest )


module.exports = router