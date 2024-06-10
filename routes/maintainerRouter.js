const { createMaintainer, getMaintainers, updateMaintainer, deleteMaintainer } = require('../controllers/maintainanerController')


const router = require('express').Router()

router.post('/createMaintainer', createMaintainer )
router.get('/getMaintainers', getMaintainers )
router.patch('/updateMaintainer', updateMaintainer )
router.delete('/deleteMaintainer', deleteMaintainer )


module.exports = router