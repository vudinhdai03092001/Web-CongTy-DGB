class AdminController {
    index(req, res) {
        res.render('admin/thongke')
    }
}
module.exports = new AdminController