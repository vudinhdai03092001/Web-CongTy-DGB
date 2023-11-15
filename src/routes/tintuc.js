const express = require('express')
const router = express.Router()
const TintucController = require('../app/controller/TintucController')
router.use('/' , TintucController.index)
module.exports = router