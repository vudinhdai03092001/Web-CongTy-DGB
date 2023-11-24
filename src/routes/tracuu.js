const express = require('express')
const router = express.Router()
const TraCuuController = require('../app/controller/TraCuuController')
const upload = require('../app/middlewares/uploadMilddle')
router.get('/', TraCuuController.index)
router.post('/creat', upload.single('filepdf'), TraCuuController.creat)

//xóa
router.delete('/:id', TraCuuController.delete)
//form edit
router.get('/:id/edit', TraCuuController.edit)
//update
router.put('/:id', upload.single('filepdf'), TraCuuController.update)
module.exports = router