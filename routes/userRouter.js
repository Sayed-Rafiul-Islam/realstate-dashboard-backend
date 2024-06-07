const { createUser, login, updateUser, getUsers } = require('../controllers/userController')

const router = require('express').Router()

router.post('/createUser', createUser)
router.post('/login', login)
router.patch('/updateUser', updateUser)
router.get('/getUsers', getUsers)
// router.post('/passwordcheck', passwordCheck)
// router.post('/updatePassword', updatePassword)
// router.delete('/deleteAdmin', deleteAdmin)

module.exports = router