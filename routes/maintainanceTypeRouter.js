const { createMaintainanceType, getMaintainaceType, updateMaintainanceType, deleteMaintainanceType } = require('../controllers/maintainanceTypeController')

const router = require('express').Router()

router.post('/createMaintainanceType', createMaintainanceType )
router.get('/getMaintainaceType', getMaintainaceType )
router.patch('/updateMaintainanceType', updateMaintainanceType )
router.delete('/deleteMaintainanceType', deleteMaintainanceType )


module.exports = router