const { getOwnerPackages } = require('../controllers/ownerPackagesController')

const router = require('express').Router()

router.get('/getOwnerPackages', getOwnerPackages )


module.exports = router