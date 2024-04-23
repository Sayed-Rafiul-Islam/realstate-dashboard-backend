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


// Route Imports

const userRouter = require('./routes/userRouter')
const varificationRouter = require('./routes/varification')


// Routes 
app.use('/api', userRouter) 
app.use('/api', varificationRouter) 

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


app.use('/', (req, res, next) => {
    res.send('running...')
})
