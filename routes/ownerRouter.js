const { getOwners } = require('../controllers/ownersController')

const router = require('express').Router()

router.get('/getOwners', getOwners )


module.exports = router