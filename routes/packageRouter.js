const { getPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packageController')

const router = require('express').Router()

router.get('/getPackages', getPackages )
router.post('/createPackage', createPackage )
router.patch('/updatePackage', updatePackage )
router.delete('/deletePackage', deletePackage )


module.exports = router