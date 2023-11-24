const express = require('express')
const router = express.Router()
const BaiVietController = require('../app/controller/BaiVietController')
const upload = require('../app/middlewares/uploadMilddle')

router.get('/', BaiVietController.index)
router.post('/creat',upload.single('image'), BaiVietController.creat)

//xem chi tiết content
router.get('/:id/detail', BaiVietController.detail)
//xóa
router.delete('/:id', BaiVietController.delete)
//form edit
router.get('/:id/edit', BaiVietController.edit)
//update
router.put('/:id',upload.single('image'), BaiVietController.update)
module.exports = router 