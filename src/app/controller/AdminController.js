const Baiviet = require('../models/baiviet')
const TraCuu = require('../models/tracuu')

class AdminController {
    index(req, res,next) {
        Promise.all([Baiviet.countDocuments(),TraCuu.countDocuments()])
        
            .then(([baiviet,tracuu]) => { res.render('admin/thongke', { baiviet,tracuu }) })
            .catch(next)
    }
}
module.exports = new AdminController