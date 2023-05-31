const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars').engine;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const route = require('./routes');
const db = require('./database');

// connect to db
db.connect();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
