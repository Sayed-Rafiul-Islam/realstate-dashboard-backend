const { addExpenseType, updateExpenseType, getOwnerExpenseType, deleteExpenseType } = require('../controllers/expenseTypeController')

const router = require('express').Router()

router.post('/addExpenseType', addExpenseType )
router.patch('/updateExpenseType', updateExpenseType )
router.get('/getOwnerExpenseType', getOwnerExpenseType )
router.delete('/deleteExpenseType', deleteExpenseType )


module.exports = router