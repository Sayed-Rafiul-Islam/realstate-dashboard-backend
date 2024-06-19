const { getOwnerPackages, assignOwnerPackage, deleteOwnerPackage, getAllOwnerPackages, activatePackage } = require('../controllers/ownerPackagesController')

const router = require('express').Router()

router.get('/getAllOwnerPackages', getAllOwnerPackages )
router.get('/getOwnerPackages', getOwnerPackages )
router.post('/assignOwnerPackage', assignOwnerPackage )
router.delete('/deleteOwnerPackage', deleteOwnerPackage )
router.patch('/activatePackage', activatePackage )


module.exports = router