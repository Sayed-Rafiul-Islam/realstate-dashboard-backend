const { getPackages, createPackage, updatePackage, deletePackage, getActivePackages } = require('../controllers/packageController')

const router = require('express').Router()

router.get('/getPackages', getPackages )
router.get('/getActivePackages', getActivePackages )
router.post('/createPackage', createPackage )
router.patch('/updatePackage', updatePackage )
router.delete('/deletePackage', deletePackage )


module.exports = router