const Course = require('../models/Course');
const Product = require('../models/Product');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort)
        Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then(deletedCount => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {})

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /me/trash/products
    trashProduct(req, res, next) {
        Product.findDeleted({})
            .then((products) =>
                res.render('me/trash-products', {
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);
    }

    storedProducts(req, res, next) {
        // await Product.find({})
        //     .then(products => {
        //         res.render('me/stored-products', {
        //             products: mutipleMongooseToObject(products)
        //         })
        //     })
        //     .catch(next)
        Promise.all([Product.find({}).sortable(req), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('me/stored-products', {
                    deletedCount,
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);
    }

    storedUsers(req, res, next) {
        Promise.all([User.find({}).sortable(req), User.countDocumentsDeleted()])
            .then(([users, deletedCount]) =>
                res.render('me/stored-users', {
                    deletedCount,
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }

    trashUser(req, res, next) {
        User.findDeleted({})
            .then((users) =>
                res.render('me/trash-users', {
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }
}
module.exports = new MeController();
