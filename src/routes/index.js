const homeRouter = require('./home')
const adminRouter = require('./admin')
const baivietRouter = require('./baiviet')
const tracuuRouter = require('./tracuu')


function route(app) {

   app.use('/admin/bai-viet', baivietRouter)
   app.use('/admin/tra-cuu-giay-chung-nhan', tracuuRouter)
   app.use('/admin', adminRouter)
   app.use('/', homeRouter)

}
module.exports = route