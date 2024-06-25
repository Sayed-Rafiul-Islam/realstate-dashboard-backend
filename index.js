const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const compression = require('compression')
const schedule = require('node-schedule')





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
const maintainanceTypeRouter = require('./routes/maintainanceTypeRouter')
const maintainerRouter = require('./routes/maintainerRouter')
const expenseTypeRouter = require('./routes/expenseTypeRouter')
const gatewayRouter = require('./routes/gatewayRouter')
const invoiceTypeRouter = require('./routes/invoiceTypeRouter')
const invoiceRouter = require('./routes/invoiceRouter')
const rentRouter = require('./routes/rentRouter')
const expenseRouter = require('./routes/expenseRouter')
const documentRouter = require('./routes/documentRouter')
const documentSettingsRouter = require('./routes/documentSettingsRouter')
const messageRouter = require('./routes/messageRouter')


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
app.use('/api', maintainanceTypeRouter)  
app.use('/api', maintainerRouter)  
app.use('/api', expenseTypeRouter)  
app.use('/api', invoiceTypeRouter)  
app.use('/api', gatewayRouter)  
app.use('/api', invoiceRouter)  
app.use('/api', rentRouter)  
app.use('/api', expenseRouter)  
app.use('/api', documentRouter)  
app.use('/api', documentSettingsRouter)  
app.use('/api', messageRouter)  



const mongoose = require('mongoose');
const OwnerPackage = require('./models/ownerPackageModel');
const Owner = require('./models/ownerModel');
const Property = require('./models/propertyModel');
const Unit = require('./models/unitModel');
const Maintainer = require('./models/maintainerModel');
const Tenant = require('./models/tenantModel');

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
    // schedule.scheduleJob('*/3 * * * * *', async () => {
    //     const packs = await OwnerPackage.find()
    //     console.log(new Date(new Date().toISOString().split("T")[0]))
    //     console.log(new Date(packs[0].endDate.toISOString().split("T")[0]))
    //     console.log(new Date(new Date().toISOString().split("T")[0]) < new Date(packs[0].endDate.toISOString().split("T")[0]))
    //     packs.map((pack) => {
    //         if(new Date('2024-07-08T17:20:58.618Z') >= pack.endDate ) {
    //             console.log(pack,"delete")
    //         }
    //     })
    // })

    
     // 18 = min
    // 20 = hr
    schedule.scheduleJob('5 0 0 * * * ', async () => {

        const packs = await OwnerPackage.find()
        packs.map(async (pack) => {            

            if (new Date(new Date().toISOString().split("T")[0]) >= new Date(pack.endDate.toISOString().split("T")[0])) {
                await OwnerPackage.deleteOne({_id : pack._id})
                const owner = await Owner.findOne({_id : pack.owner})
                const isPack = await OwnerPackage.findOne({_id : owner.ownerPackage})
                if (!isPack) {
                    await Property.deleteMany({owner : owner._id})
                    await Unit.deleteMany({owner : owner._id})
                    await Maintainer.deleteMany({owner : owner._id})
                    await Tenant.deleteMany({owner : owner._id})
                    await Owner.updateOne({_id : owner._id},{
                        propertyCount : 0,
                        unitCount : 0,
                        maintainerCount : 0,
                        activePackage : null
                    })
                }
                
            }
          
        })
    })
}))
.catch((err)=> console.log(err))



app.use('/', (req, res, next) => {
    res.send('running...')
})
