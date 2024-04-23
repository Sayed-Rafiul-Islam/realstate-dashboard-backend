const express = require('express');
const router = express.Router()

const { userAuthViaToken } = require("../middlewares/auth");
const { varify, getAccessLevel } = require('../controllers/varificationController');


router.get('/varify',userAuthViaToken, varify)
// router.get('/getAccessLevel',userAuthViaToken, getAccessLevel)

module.exports = router