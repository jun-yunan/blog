const Course = require('../models/Course');
const Product = require('../models/Product');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRETKEY;
var cookieParser = require('cookie-parser');

class ApiController {
    async show(req, res, next) {
        await Course.find({})
            .then((course) => {
                res.json({
                    status: 'successfully!!!',
                    success: true,
                    data: course,
                });
            })
            .catch(next);
    }

    async getProductAll(req, res, next) {
        await Product.find({})
            .then((products) => {
                res.json({
                    status: 'successfully!!',
                    data: products,
                });
            })
            .catch((err) => {
                throw err;
            });
    }

    //[GET] /api/products/get
    async get(req, res, next) {
        await Product.find({ type: req.query.typeProduct })
            .then((products) => {
                res.json({
                    query: req.query,
                    status: 'successfully!!',
                    data: products,
                });
            })
            .catch((err) => {
                throw err;
            });
    }

    //[GET] /api/products/getById
    async getById(req, res, next) {
        await Product.findOne({ _id: req.query.idProduct })
            .then((product) => {
                res.json({
                    query: req.query,
                    status: 'successfully',
                    data: product,
                });
            })

            .catch(next);
    }

    // [GET] /api/users/getAllUser
    async getAllUser(req, res, next) {
        await User.find({})
            .then((users) =>
                res.json({
                    status: 'successfully!',
                    data: users,
                }),
            )
            .catch(() => {
                res.json({
                    status: 'Error',
                });
            });
    }

    //[POST] /api/users/checkLogin
    checkLogin(req, res, next) {
        try {
            const username = req.username;
            const user = { username };
            const token = jwt.sign(user, secretKey, { expiresIn: '1d' });
            const nameCookie = 'token';
            const valueCookie = token;
            res.json({
                status: true,
                message: 'Check Login successfully',
                cookie: { nameCookie, valueCookie },
            });
        } catch (error) {
            res.json({
                status: false,
                message: 'Check Login fail',
                error,
            });
        }
    }

    //[POST] /api/users/createAccount
    async createAccount(req, res, next) {
        const {
            username,
            password,
            email,
            fullName = '',
            avatar = '',
            gender = '',
            date = '',
            numberPhone = '',
            address = '',
        } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        // res.json({ status: 'successfully', hash, request: req.body });

        await User.create({
            username,
            password: hash,
            email,
            fullName,
            avatar,
            gender,
            date,
            numberPhone,
            address,
        })
            .then((result) =>
                res.json({
                    status: true,
                    message: 'Tạo tài khoản thành công',
                    hash,
                    request: req.body,
                    result,
                }),
            )
            .catch((err) => {
                res.json({
                    status: false,
                    message: 'Tạo tài khoản không thành công',
                    err,
                });
            });
    }
}

module.exports = new ApiController();
