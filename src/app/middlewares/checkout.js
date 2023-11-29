
const Account = require('../models/Account')
var jwt = require('jsonwebtoken');
class CheckController {
    checkout(req, res, next) {
        var token = req.cookies.token
        if (token === undefined) {
            res.render('error404/error')
        }
        else {
            var idUser = jwt.verify(token, 'mk')
            Account.find({ _id: idUser._id })
                .then(data => {

                    if (data.length === 0) {
                        res.redirect('/user/login')
                    }
                    else {
                        if (data[0].role >= 1) {
                            next()
                        }
                        else {
                            res.redirect('/user/login')
                        }
                    }
                }
                )
                .catch(() => { res.json('loi sever') })
        }
    }
}
module.exports = new CheckController
