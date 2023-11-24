const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const paginate = require('handlebars-paginate');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.urlencoded({
    extended:true
  }))

//change method
app.use(methodOverride('_method'))

//body
//app.use(express.urlencoded())
app.use(express.json())


//template
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        paginate: paginate.createPagination,
        sum: (a, b) => a + b,
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//morgan console log
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))
//đường dẫn đến file ảnh
app.use('/uploads', express.static('uploads'))
route(app)
db.connect();
app.listen(port, () => {
    console.log(`Example app listening on port : http://localhost:${port}/`)
})