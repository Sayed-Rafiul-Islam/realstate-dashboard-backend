const { createMessage, deleteMessage, getMessages, getSentMessages, viewMessage, createAdminMessage } = require('../controllers/messageController')


const router = require('express').Router()

router.post('/createMessage', createMessage )
router.post('/createAdminMessage', createAdminMessage )
router.patch('/viewMessage', viewMessage )
router.get('/getMessages', getMessages )
router.get('/getSentMessages', getSentMessages )
router.delete('/deleteMessage', deleteMessage )


module.exports = router