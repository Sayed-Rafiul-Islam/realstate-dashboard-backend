const { addUnit, getUnits, updateUnit, deleteUnit } = require('../controllers/unitController')


const router = require('express').Router()

router.get('/getUnits', getUnits )
router.post('/addUnit', addUnit )
router.patch('/updateUnit', updateUnit )
router.delete('/deleteUnit', deleteUnit )


module.exports = router