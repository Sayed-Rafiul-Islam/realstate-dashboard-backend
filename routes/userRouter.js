const { createUser, login } = require('../controllers/userController')

const router = require('express').Router()

router.post('/createUser', createUser)
router.post('/login', login)
// router.get('/getAdmins', getAdmins)
// router.get('/getAdmin', getAdmin)
// router.post('/passwordcheck', passwordCheck)
// router.post('/updatePassword', updatePassword)
// router.delete('/deleteAdmin', deleteAdmin)

module.exports = router