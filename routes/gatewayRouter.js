const { addGateway, updateGateway, getOwnerGateway, deleteGateway } = require('../controllers/gatewayController')

const router = require('express').Router()

router.post('/addGateway', addGateway )
router.patch('/updateGateway', updateGateway )
router.get('/getOwnerGateway', getOwnerGateway )
router.delete('/deleteGateway', deleteGateway )


module.exports = router