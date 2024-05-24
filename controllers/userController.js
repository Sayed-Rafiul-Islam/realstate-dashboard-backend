const User = require('../models/userModel')
const { createJwt } = require('../utils/varifyJWT')
const { encode } = require('../utils/cypher')
const bcrypt = require('bcrypt');

// login

const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const currentDate = new Date()

        const isUser = await User.findOne({ email})
        if (!isUser) {
            res.status(404).send({message : "No account with this user name"})
        } else {
            bcrypt.compare(password,isUser.pass_word,async (err,result)=>{
                if (result) {
                    const data = {email, role : isUser.role, date : currentDate}
                    const token = await createJwt(data)
                    res.status(200).json({accessToken : token,role : isUser.role, email})
                } else {
                    res.status(400).json({message : "Password did not match"})
                }

            })
            
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({messgae : "something went wrong"})
    }
}

// Create new Admin


const createUser = async (req,res) => {
    try {
        const {email,password,role} = req.body;


        const data = {email, role, date : new Date()}
        const token = await createJwt(data)


        const pass_word = await encode(password)
            await User.create({
                email,
                pass_word,
                role
            })
            res.status(200).send({accessToken : token})
        

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}


const updateUser = async (req,res) => {
    try {
        const {email, firstName, lastName,contactNo,NID,birthDate,imageUrl,printName,printAddress,printContact,printLogo} = req.body;

        await User.updateOne({
                email,
        }, {
            firstName,
            lastName,
            contactNo,
            NID,
            birthDate,
            imageUrl,
            printName,
            printAddress,
            printContact,
            printLogo
        })

        res.status(200).send('success')
        

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}


// const getAdmins = async (req,res) => {
//     try {
//         const all = await Admin.find()
//         const admins = all.filter(({role}) => role !== "supremeAdmin")
//         res.status(200).send(admins)
//         } catch (error) {
//             console.log(error)
//             res.status(500).send(error)
//         }
// }

// const getAdmin = async (req,res) => {
//     try {
//         const email = req.query.email
//         if (email === '') {
//             res.status(200).send({exists : false})
//         } else {
//             const admin = await Admin.findOne({email : email})
//             console.log(admin)
//             if (admin) {
//                 res.status(200).send({exists : true})
//             } else {
//                 res.status(200).send({exists : false})
//             }
//         }

//         } catch (error) {
//             console.log(error)
//             res.status(500).send(error)
//         }
// }

// const passwordCheck = async (req,res) => {
//     try {
//         const {email,oldPassword} = req.body

//             const admin = await Admin.findOne({email})

//             bcrypt.compare(oldPassword,admin.pass_word,async (err,result)=>{

//                 if (result) {
//                     res.status(200).send({match : true})
//                 } else {
//                     res.status(200).send({match : false})
//                 }
//             })
        

//         } catch (error) {
//             console.log(error)
//             res.status(500).send(error)
//         }
// }

// const updatePassword = async (req,res) => {
//     try {
//         const {email,password} = req.body
//         const pass_word = await encode(password)
//         await Admin.updateOne({email},{pass_word},{new : true})
//         res.status(200).send({result : "success"})       

//         } catch (error) {
//             console.log(error)
//             res.status(500).send(error)
//         }
// }


// const deleteAdmin = async (req,res) => {
//     try {
//         const _id = req.query.id
//         await Admin.deleteOne({_id})
//         res.status(200).json({message : "Admin removed"})
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

// export

module.exports = {
    createUser,
    login,
    updateUser
    // getAdmins,
    // getAdmin,
    // deleteAdmin,
    // passwordCheck,
    // updatePassword
}