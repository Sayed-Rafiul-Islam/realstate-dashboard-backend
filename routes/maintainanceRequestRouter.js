const router = require('express').Router()
const { createRequest, getRequests, updateRequest } = require('../controllers/maintainanceRequestController')



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
// const upload = multer({ storage: storage })


// router.post('/createRequest',upload.single('file'), createRequest )
// router.post('/updateRequest',upload.single('file'), updateRequest )
router.post('/createRequest', createRequest )
router.post('/updateRequest', updateRequest )
router.get('/getRequests', getRequests )


module.exports = router