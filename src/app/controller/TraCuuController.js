
const TraCuus = require('../models/tracuu')
class TraCuuController {
    index(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 4; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        TraCuus.find({}).lean()
            .then(data => {
                const totalPages = Math.ceil(data.length / pageSize);
                const pages = Array.from({ length: totalPages }, (_, index) => {
                    return {
                        number: index + 1,
                        active: index + 1 === page,
                        isDots: index + 1 > 5
                    };
                });
                const paginatedData = data.slice(startIndex, endIndex);
                // Chuẩn bị dữ liệu để truyền vào template
                const viewData = {

                    tracuu: paginatedData,
                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('admin/tracuu/tracuu', viewData);
            })

            .catch(next)

       
    }
    creat(req, res, next) {
        const currentDate = new Date();
        const tracuu = new TraCuus(req.body)
        tracuu.ngaygiahan = tracuu.ngaybatdau
        tracuu.trangthai = 'Đang còn hiệu lực'
        if (currentDate > new Date(tracuu.ngayketthuc)) {
            tracuu.trangthai = 'Hết hiệu lực';
        }
        if (req.file) {
            tracuu.filepdf = req.file.path
        }
        tracuu.save()
            .then(() => res.redirect('/admin/tra-cuu-giay-chung-nhan'))
            .catch(next)
    }
    delete(req, res, next) {
        TraCuus.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] Edit /:id
    edit(req, res, next) {
        TraCuus.findById(req.params.id).lean()
            .then(tracuu => res.render('admin/tracuu/edit', { tracuu }))
            .catch(next)

    }
    //[PUT] UPDATE /:id
    update(req, res, next) {

        TraCuus.updateOne({ _id: req.params.id }, {
            madangky: req.body.madangky,
            filepdf: req.file.path,
            conty: req.body.congty,
            diachi: req.body.diachi,
            sdt: req.body.sdt,
            nguoidaidien: req.body.nguoidaidien,
            ngaybatdau: req.body.ngaybatdau,
            ngayketthuc: req.body.ngayketthuc,
            trangthai: req.body.trangthai,
        }

        ).lean()
            .then(() => res.redirect('/admin/tra-cuu-giay-chung-nhan'))
            .catch(next)
    }
}
module.exports = new TraCuuController