const Course = require('../models/Course');
const Product = require('../models/Product');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /me/trash/products
    trashProduct(req, res, next) {
        Product.findDeleted({})
            .then((products) =>
                res.render('me/trash-products', {
                    products: multipleMongooseToObject(products),
                }),
            )
            .catch(next);
    }

    // [GET] /me/stored/products
    storedProducts(req, res, next) {
        Product.find({})
            .then((products) =>
                res.render('me/stored-products', {
                    products: multipleMongooseToObject(products),
                }),
            )
            .catch(next);
    }

    // [GET] /me/stored/users
    storedUsers(req, res, next) {
        User.find({})
            .then((users) =>
                res.render('me/stored-users', {
                    users: multipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/users
    trashUser(req, res, next) {
        User.findDeleted({})
            .then((users) =>
                res.render('me/trash-users', {
                    users: multipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }
}
module.exports = new MeController();
