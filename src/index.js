// import handlebars from 'handlebars';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine;
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();


const port = process.env.PORT;
const SortMiddleware = require('./app/middleware/sortMiddleware')



const route = require('./routes')
const db = require('./config/database')

// connect to db
db.connect();

app.use(cors());

app.use('/src/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('uploads'));

// app.use(express.urlencoded({
//     extended: true
// }))
// app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(SortMiddleware)

app.use(methodOverride('_method'))

// app.get('/middleware',
//     function(req, res, next) {
//         if (['vethuong', 'vevip'].includes(req.query.ve)) {
//             req.face = 'gach gach gach'
//             return next()
//         }
//         res.status(403).json({message: 'access denied'})
//     }
//     ,
//     function (req, res, next) {
//         res.json({
//             message: 'success',
//             face: req.face
//         })
//     }
// )

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// route init
route(app)


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));