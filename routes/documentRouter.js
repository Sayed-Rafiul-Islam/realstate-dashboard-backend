const { updateDocument, getOwnerDocument, getTenantDocument, deleteDocument, addDocument } = require('../controllers/documentController')

const router = require('express').Router()

router.post('/addDocument', addDocument)
router.patch('/updateDocument', updateDocument )
router.get('/getOwnerDocument', getOwnerDocument )
router.get('/getTenantDocument', getTenantDocument )
router.delete('/deleteDocument', deleteDocument )


module.exports = router