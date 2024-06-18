const { deleteExpense, getExpense } = require('../controllers/expenseController')
const router = require('express').Router()

router.get('/getExpense', getExpense )
router.delete('/deleteExpense', deleteExpense )


module.exports = router