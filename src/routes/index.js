const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const apiRouter = require('./api');
const productRouter = require('./products');
const userRouter = require('./users');

function route(app) {
    app.use('/users', userRouter);

    app.use('/news', newsRouter);
    app.use('/me', meRouter);

    app.use('/courses', coursesRouter);

    app.use('/products', productRouter);

    app.use('/api', apiRouter);

    app.use('/', siteRouter);
}

module.exports = route;
