const { getProperties, addProperty, updateProperty, deleteProperty } = require('../controllers/propertyController')


const router = require('express').Router()

router.get('/getProperties', getProperties )
router.post('/addProperty', addProperty )
router.patch('/updateProperty', updateProperty )
router.delete('/deleteProperty', deleteProperty )


module.exports = router