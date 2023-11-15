const BaiViets = require('../models/baiviet')

class BaiVietController {
    index(req, res, next) {
        BaiViets.find({}).lean()
            .then((baiviet) => { res.render('admin/baiviet/store', { baiviet },console.log(baiviet)) })
            .catch(next)
    }
    creat(req, res, next) {
        console.log(req.body)
        const baiviet = new BaiViets(req.body)
        baiviet.save()
            .then(() => res.redirect('/admin/bai-viet'))
            .catch(next)
    }
    //[GET] detail content
    detail(req, res, next) {
        BaiViets.findById(req.params.id).lean()
            .then(baiviet => res.render('admin/baiviet/detail', { baiviet }))
            .catch(next)
    }
    //[DELETE]
    delete(req, res, next) {
        BaiViets.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [GET] Edit /:id
    edit(req, res, next) {
        BaiViets.findById(req.params.id).lean()
            .then(baiviet => res.render('admin/baiviet/edit', { baiviet }))
            .catch(next)

    }
    //[PUT] UPDATE /:id
    update(req, res, next) {

        BaiViets.updateOne({ _id: req.body._id }, req.body).lean()
            .then(() => res.redirect('/admin/bai-viet'))
            .catch(next)
    }
}
module.exports = new BaiVietController