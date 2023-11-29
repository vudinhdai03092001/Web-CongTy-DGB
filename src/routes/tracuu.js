const express = require('express')
const router = express.Router()
const TraCuuController = require('../app/controller/TraCuuController')
const upload = require('../app/middlewares/uploadMilddle')
const CheckController = require('../app/middlewares/checkout')
router.get('/', CheckController.checkout, TraCuuController.index)
router.post('/creat', CheckController.checkout, upload.single('filepdf'), TraCuuController.creat)

//xóa
router.delete('/:id', CheckController.checkout, TraCuuController.delete)
//form edit
router.get('/:id/edit', CheckController.checkout, TraCuuController.edit)
//update
router.put('/:id', CheckController.checkout, upload.single('filepdf'), TraCuuController.update)
module.exports = router