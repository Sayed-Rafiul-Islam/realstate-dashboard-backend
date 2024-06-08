const { getOwners, updateOwner } = require('../controllers/ownersController')

const router = require('express').Router()

router.get('/getOwners', getOwners )
router.patch('/updateOwner', updateOwner )


module.exports = router