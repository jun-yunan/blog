const Course = require('../models/Course');
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

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

    // [GET] /api/users/getUser
    async getUser(req, res, next) {
        User.findOne({ username: req.query.username })
            .then((user) =>
                res.json({
                    message: 'Get User Successfully!!!',
                    status: true,
                    data: user,
                }),
            )
            .catch((error) =>
                res.json({
                    message: 'Get User Fail!!!',
                    status: false,
                    error,
                }),
            );
    }

    //[POST] /api/users/checkLogin
    async checkLogin(req, res, next) {
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

    // [POST] /user/post/update
    async update(req, res, next) {
        // res.json({ status: true, message: 'successfully!', result: req.body });

        await User.updateOne({ _id: req.body._id }, req.body)
            .then(() =>
                res.json({
                    status: true,
                    message: 'Update Info User Successfully!!!',
                }),
            )
            .catch((error) => {
                res.json({
                    status: false,
                    message: 'Update Info User Fail!!!',
                    error,
                });
            });
    }

    // CARTS

    //[POST] /carts/post/addToCart
    async addToCart(req, res, next) {
        try {
            const { userId, productId, username, nameProduct, quantity } = req.body;

            const cart = await Cart.findOne({ userId });

            if (!cart) {
                const newCart = await Cart.create({
                    userId,
                    items: [{ productId, quantity, nameProduct }],
                    username,
                });
                return res.json({
                    resultNewCart: newCart,
                    status: true,
                    message: 'Add to Cart Successfully!!!',
                });
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId.toString(),
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, nameProduct });
            }

            const updatedCart = await cart.save();
            return res.json({
                resultUpdateCart: updatedCart,
                status: true,
                message: 'Add to Cart Successfully!!!',
            });
        } catch (error) {
            return res.status(500).json({ error, status: false, message: 'Add to Cart Fail!!!' });
        }
    }

    //[GET] /carts/get/productInCart
    async productInCart(req, res, next) {
        try {
            const { userId } = req.query;
            const cart = await Cart.findOne({ userId });

            const findIdProduct = cart.items.map((item) => item.productId);

            const productQuantities = {};
            cart.items.forEach((item) => {
                if (!productQuantities[item.productId]) {
                    productQuantities[item.productId] = item.quantity;
                } else {
                    productQuantities[item.productId] += item.quantity;
                }
            });

            const listProduct = await Product.find({ _id: { $in: findIdProduct } });

            const listProductWithQuantity = listProduct.map((product) => ({
                ...product.toObject(),
                quantity: productQuantities[product._id] || 0,
                isChecked: false,
            }));

            res.json({
                listProduct: listProductWithQuantity,
                message: 'Get Product In Cart Successfully!!!',
                status: true,
            });
        } catch (error) {
            res.json({
                error,
                message: 'Get Product In Cart Fail!!!',
                status: false,
            });
        }
    }

    //[POST] /carts/decreaseQuantity
    async decreaseQuantity(req, res, next) {
        try {
            const { userId, productId } = req.body;

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return next();
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId.toString(),
            );

            if (!existingItem) {
                return next();
            }

            existingItem.quantity -= 1;

            const newCart = await cart.save();
            res.json({
                message: 'decrease',
                request: req.body,
                existingItem,
                newCart,
                quantityUpdated: existingItem.quantity,
            });
            return next();
        } catch (error) {
            res.json({
                error,
                status: false,
                message: 'Fail!!!',
            });
        }
    }

    //[POST] /carts/increaseQuantity
    async increaseQuantity(req, res, next) {
        try {
            const { userId, productId } = req.body;

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return next();
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId.toString(),
            );

            if (!existingItem) {
                return next();
            }

            existingItem.quantity += 1;

            const newCart = await cart.save();
            res.json({
                message: 'decrease',
                request: req.body,
                existingItem,
                newCart,
                quantityUpdated: existingItem.quantity,
            });
            return next();
        } catch (error) {
            res.json({
                error,
                status: false,
                message: 'Fail!!!',
            });
        }
    }

    //[POST] /carts/deleteProduct
    async deleteProduct(req, res, next) {
        try {
            const { userId, productId } = req.body;

            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return next();
            }

            const cartDeleted = cart.items.filter((product) => {
                // if (product.productId.toString() === productId.toString()) {
                //     return false;
                // }
                // return true;
                return product.productId.toString() !== productId.toString();
            });

            cart.items = cartDeleted;
            const newCart = await cart.save();

            res.json({
                newCart,
                status: true,
                message: 'Delete Successfully!!!',
            });
            return next();
        } catch (error) {
            res.json({ status: false, message: 'Delete Fail!!!', error });
        }
    }

    //[POST] /carts/totalPrice
    // async totalPrice(req, res, next) {
    //     try {
    //         const { userId, productId } = req.body;

    //         const cart = await Cart.findOne({ userId });

    //         if (!cart) return next();

    //         const getPrice = await Product.findOne({ _id: productId }, { _id: 0, price: 1 });
    //         const existingItem = cart.items.find(
    //             (item) => item.productId.toString() === productId.toString(),
    //         );

    //         const { price } = getPrice;

    //         res.json({
    //             productId,
    //             price,
    //             status: true,
    //             message: 'Successfully',
    //             quantity: existingItem.quantity,
    //         });
    //         return next();
    //     } catch (error) {
    //         res.json({ error, message: 'error', status: false });
    //     }
    // }
}

module.exports = new ApiController();
