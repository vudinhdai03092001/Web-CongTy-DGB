
const BaiViet = require('../models/baiviet')

class HomeController {
    index(req, res, next) {
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(), BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean()])
            .then(([dichvu, gioithieu]) => {
                res.render('home', { dichvu, gioithieu })
            })
            .catch(next)
    }
    baiviet(req, res, next) {
        
        BaiViet.findOne({ slug: req.params.slug }).lean()
            .then(baiviet => {
                res.render('baiviet/detail', { baiviet })
            })
            .catch(next)
    }
    gioithieu(req, res) {
        res.render('gioithieu/detail')
    }
    tintuc(req, res) {
        res.render('tintuc/tintuc')
    }
}
module.exports = new HomeController