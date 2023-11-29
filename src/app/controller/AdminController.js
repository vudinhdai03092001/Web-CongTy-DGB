const Biaviet = require('../models/baiviet')
const TraCuu = require('../models/tracuu')
const { tintuc } = require('./HomeController')
class AdminController {
    index(req, res,next) {
        Promise.all([Biaviet.countDocuments(),TraCuu.countDocuments()])
        
            .then(([baiviet,tracuu]) => { res.render('admin/thongke', { baiviet,tracuu }) })
            .catch(next)

    }
}
module.exports = new AdminController