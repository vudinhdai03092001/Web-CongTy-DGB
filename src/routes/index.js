const homeRouter = require('./home')
const adminRouter = require('./admin')
const tintucRouter = require('./tintuc')
const baivietRouter = require('./baiviet')

function route(app) {
 
   app.use('/admin/tin-tuc', tintucRouter)
   app.use('/admin/bai-viet', baivietRouter)
   app.use('/admin', adminRouter)
   app.use('/', homeRouter)

}
module.exports = route