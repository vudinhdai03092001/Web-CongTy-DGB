const express = require('express')
const router = express.Router()
const HomeController = require('../app/controller/HomeController')
router.use('/bai-viet/:slug', HomeController.baiviet)
router.use('/tin-tuc', HomeController.tintuc)
router.use('/', HomeController.index)

module.exports = router