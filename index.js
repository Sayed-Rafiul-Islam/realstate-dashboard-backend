const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const compression = require('compression')





const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(compression({
    level : 6,
    threshold : 0
}))
app.use("/files",express.static('files'))


// Route Imports

const userRouter = require('./routes/userRouter')
const varificationRouter = require('./routes/varification')
const maintainanceRequestRouter = require('./routes/maintainanceRequestRouter')
const notificationsRouter = require('./routes/notificationsRouter')
const ownersRouter = require('./routes/ownerRouter')


// Routes 
app.use('/api', userRouter) 
app.use('/api', varificationRouter) 
app.use('/api', maintainanceRequestRouter) 
app.use('/api', notificationsRouter) 
app.use('/api', ownersRouter) 

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const clientOptions = { 
    serverApi: { 
        version: '1', 
        strict: false, 
        deprecationErrors: true 
    } ,
    maxPoolSize : 400
}

mongoose.connect(uri, clientOptions)
.then(()=> app.listen(port, () => {
    console.log(`Connected to Database and Listening to port ${port}`)
}))
.catch((err)=> console.log(err))


// const multer  = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './files')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now()
//       cb(null,uniqueSuffix+file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage })


// app.post('/api/createRequests',upload.single('file'), async(req,res) => {
//     try {
//         console.log([req.file.filename,req.body])
//         res.status(200).send({message : "success"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({error})
//     }
//   } )




app.use('/', (req, res, next) => {
    res.send('running...')
})
