const BaiViets = require('../models/baiviet')
const moment = require('moment/moment')
class BaiVietController {
    index(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 4; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        BaiViets.find({}).lean()
            .then(data => {
                const totalPages = Math.ceil(data.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                    };
                });
                const paginatedData = data.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {
                   
                    baiviet: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('admin/baiviet/store', viewData);
            })

            .catch(next)
    }
    creat(req, res, next) {

        const baiviet = new BaiViets({
            title: req.body.title,
            category: req.body.category,
            image: req.file.path,
            content: req.body.editor,
            date: moment().format('DD-MM-YYYY')
        })
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

        BaiViets.updateOne({ _id: req.body.id }, {
            title: req.body.title,
            image: req.file.path,
            category: req.body.category,
            content: req.body.editor,
            date: moment().format('DD-MM-YYYY')
        }).lean()
            .then(() => res.redirect('/admin/bai-viet'))
            .catch(next)
    }
}
module.exports = new BaiVietController