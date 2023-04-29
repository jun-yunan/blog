// import handlebars from 'handlebars';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars').engine;
const app = express();
const port = 3000;

const route = require('./routes')
const db = require('./config/db')

// connect to db

db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// route init
route(app)


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));