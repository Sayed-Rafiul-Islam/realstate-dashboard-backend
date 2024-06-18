const { addDocumentSettings, updateDocumentSettings, getOwnerDocumentSettings, deleteDocumentSettings } = require('../controllers/documentSettingsController')

const router = require('express').Router()

router.post('/addDocumentSettings', addDocumentSettings)
router.patch('/updateDocumentSettings', updateDocumentSettings )
router.get('/getOwnerDocumentSettings', getOwnerDocumentSettings )
router.delete('/deleteDocumentSettings', deleteDocumentSettings )


module.exports = router