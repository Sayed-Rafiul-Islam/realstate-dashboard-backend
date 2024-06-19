const { createMessage, getTenantMessage, getMaintainerMessage, getOwnerMessage, deleteMessage } = require('../controllers/messageController')


const router = require('express').Router()

router.post('/createMessage', createMessage )
// router.patch('/updateExpenseType', updateExpenseType )
router.get('/getMaintainerMessage', getMaintainerMessage )
router.get('/getTenantMessage', getTenantMessage )
router.get('/getOwnerMessage', getOwnerMessage )
router.delete('/deleteMessage', deleteMessage )


module.exports = router