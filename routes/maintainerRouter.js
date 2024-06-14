const { createMaintainer, getMaintainers, updateMaintainer, deleteMaintainer, getOwnerMaintainers } = require('../controllers/maintainanerController')


const router = require('express').Router()

router.post('/createMaintainer', createMaintainer )
router.get('/getMaintainers', getMaintainers )
router.get('/getOwnerMaintainers', getOwnerMaintainers )
router.patch('/updateMaintainer', updateMaintainer )
router.delete('/deleteMaintainer', deleteMaintainer )


module.exports = router