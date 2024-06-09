const { getProperties, addProperty, updateProperty, deleteProperty, getOwnerProperties } = require('../controllers/propertyController')


const router = require('express').Router()

router.get('/getProperties', getProperties )
router.get('/getOwnerProperties', getOwnerProperties )
router.post('/addProperty', addProperty )
router.patch('/updateProperty', updateProperty )
router.delete('/deleteProperty', deleteProperty )


module.exports = router