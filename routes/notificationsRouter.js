const { getNotifications } = require('../controllers/notificationsController')

const router = require('express').Router()

router.get('/getNotifications', getNotifications )


module.exports = router