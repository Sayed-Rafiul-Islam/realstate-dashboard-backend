const Expense = require('../models/expenseModel')
const ExpenseType = require('../models/expenseTypeModel')
const Notification = require('../models/notificaionModel')


// const addExpenseType = async(req,res) => {
//     try {
//         const data = req.body
//         const result = await ExpenseType.create(data)
//         const newType = await ExpenseType.findOne({_id : result._id}).populate("owner")
//         res.status(200).send(newType)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
//   }


// const updateExpenseType = async(req,res) => {
//     try {
//         const {_id,...rest} = req.body
//         await ExpenseType.updateOne({_id}, rest)
//         const updatedType = await ExpenseType.findOne({_id}).populate("owner")

//         res.status(200).send(updatedType)
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

// const getProperties = async(req,res) => {
//     try {
//         const properties = await Property.find().populate("owner")
//         res.status(200).send(properties)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
// }

const getExpense = async(req,res) => {
    try {
        const owner = req.query.ownerId
        const expenses = await Expense.find({owner}).populate(["request","property","unit","owner",{
            path : "maintainer",
            populate : {
                path : "type"
            }
    }])

        res.status(200).send(expenses)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

const deleteExpense = async(req,res) => {
    try {
        const _id = req.query.id
        await Expense.deleteOne({_id})
        res.status(200).json()
    } catch (error) {
        res.status(500).send(error)
    }
}

// export

module.exports = {
    getExpense,
    deleteExpense
}