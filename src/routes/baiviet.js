const express = require('express')
const router = express.Router()
const BaiVietController = require('../app/controller/BaiVietController')
router.get('/', BaiVietController.index)
router.post('/creat', BaiVietController.creat)

//xem chi tiết content
router.get('/:id/detail', BaiVietController.detail)
//xóa
router.delete('/:id', BaiVietController.delete)
//form edit
router.get('/:id/edit', BaiVietController.edit)
//update
router.put('/:id', BaiVietController.update)
module.exports = router