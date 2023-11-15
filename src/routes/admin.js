const express = require('express')
const router = express.Router()
const AdminController = require('../app/controller/AdminController')
router.use('/' , AdminController.index)
module.exports = router