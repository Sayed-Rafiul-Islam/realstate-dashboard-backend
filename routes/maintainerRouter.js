const { createMaintainer } = require('../controllers/maintainanerController')


const router = require('express').Router()

router.post('/createMaintainer', createMaintainer )
// router.get('/getMaintainaceType', getMaintainaceType )
// router.patch('/updateMaintainanceType', updateMaintainanceType )
// router.delete('/deleteMaintainanceType', deleteMaintainanceType )


module.exports = router