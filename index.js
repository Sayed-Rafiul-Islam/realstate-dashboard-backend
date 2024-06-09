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
const packageRouter = require('./routes/packageRouter')
const ownerPackagesRouter = require('./routes/ownerPackagesRouter')
const ordersRouter = require('./routes/ordersRouter')
const propertyRouter = require('./routes/propertyRouter')
const unitRouter = require('./routes/unitRouter')
const tenantRouter = require('./routes/tenantRouter')


// Routes 
app.use('/api', userRouter) 
app.use('/api', varificationRouter) 
app.use('/api', maintainanceRequestRouter) 
app.use('/api', notificationsRouter) 
app.use('/api', ownersRouter) 
app.use('/api', packageRouter)  
app.use('/api', ownerPackagesRouter)  
app.use('/api', ordersRouter)  
app.use('/api', propertyRouter)  
app.use('/api', unitRouter)  
app.use('/api', tenantRouter)  

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
