const { updateDocument, getOwnerDocument, getTenantDocument, deleteDocument, updateOwnerDocument, addMaintainerDocument, addTenantDocument, getMaintainerDocument } = require('../controllers/documentController')

const router = require('express').Router()

router.post('/addTenantDocument', addTenantDocument)
router.post('/addMaintainerDocument', addMaintainerDocument)
router.patch('/updateDocument', updateDocument )
router.patch('/updateOwnerDocument', updateOwnerDocument )
router.get('/getOwnerDocument', getOwnerDocument )
router.get('/getTenantDocument', getTenantDocument )
router.get('/getMaintainerDocument', getMaintainerDocument )
router.delete('/deleteDocument', deleteDocument )


module.exports = router