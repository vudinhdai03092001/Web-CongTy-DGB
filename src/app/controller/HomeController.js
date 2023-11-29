

const BaiViet = require('../models/baiviet')

const TraCuu = require('../models/tracuu')

class HomeController {
    index(req, res, next) {
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean(),
        BaiViet.findOne({ title: "Giới thiệu tổ chức" }).lean()])
            .then(([dichvu, gioithieu, gioithieutochuc]) => {
                res.render('home', { dichvu, gioithieu, gioithieutochuc })
            })
            .catch(next)
    }
    baiviet(req, res, next) {
        Promise.all([BaiViet.findOne({ slug: req.params.slug }).lean(),
        BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean()])
            .then(([baiviet, dichvu, gioithieu]) => {
                res.render('baiviet/detail', { baiviet, dichvu, gioithieu })
            })
            .catch(next)
    }
    tracuu(req, res, next) {
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean()])
            .then(([dichvu, gioithieu]) => { res.render('tracuu/tracuu', { dichvu, gioithieu }) })
            .catch(next)

    }
    tintuc(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = 6; // Kích thước trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        Promise.all([BaiViet.find({ category: { $regex: 'tin tức', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'tin tức', $options: 'i' } }).lean().sort({ createdAt: -1 }).limit(9),
        BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean()])

            .then(([data, latestPosts, dichvu, gioithieu]) => {
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
                    dichvu: dichvu,
                    gioithieu: gioithieu,
                    latestPosts: latestPosts,
                    tintuc: paginatedData,

                    pagination: {
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('tintuc/tintuc', viewData);
            })
            .catch(next)
    }
    search(req, res, next) {
        const madangky = req.body.madangky
        const ngaybatdau = req.body.ngaybatdau
        const ngayketthuc = req.body.ngayketthuc
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean(),
        TraCuu.findOne({
            madangky: madangky,
            ngaybatdau: ngaybatdau,
            ngayketthuc: ngayketthuc
        }).lean()])

            .then(([dichvu, gioithieu, tracuu]) => res.render('tracuu/tracuu', { dichvu, gioithieu, tracuu }))
            .catch(next)
    }
    lienhe(req, res, next) {
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean()])
            .then(([dichvu, gioithieu]) => { res.render('lienhe/lienhe', { dichvu, gioithieu }) })
            .catch(next)
    }
    timkiem(req, res, next) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 9;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const searchTerm = req.query.search || '';
        Promise.all([BaiViet.find({ category: { $regex: 'dịch vụ', $options: 'i' } }).lean(),
        BaiViet.find({ category: { $regex: 'giới thiệu', $options: 'i' } }).lean(),
        BaiViet.find({ title: { $regex: searchTerm, $options: 'i' } }).lean()])

            .then(([dichvu, gioithieu, data]) => {
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
                    dichvu: dichvu,
                    gioithieu: gioithieu,
                    data: paginatedData,
                    searchTerm,

                    pagination: {
                        // valuecurrent: searchTerm,
                        prev: page > 1 ? page - 1 : null,
                        next: endIndex < data.length ? page + 1 : null,
                        pages: pages,
                    },
                };
                // Render template và truyền dữ liệu
                res.render('timkiem/timkiem', viewData);
            })


    }
    error404(req, res) {
        res.render('error404/error')
    }
}
module.exports = new HomeController