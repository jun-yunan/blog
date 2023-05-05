const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRETKEY;
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class UserController {
    // [GET] /users/login
    show(req, res, next) {
        res.render('users/login');
    }

    // [POST] /users/login
    async login(req, res, next) {
        const username = req.username;

        const user = { username };
        const token = jwt.sign(user, secretKey, { expiresIn: '1d' });
        const nameCookie = 'token';
        const valueCookie = token;
        res.cookie(nameCookie, valueCookie);

        return res.redirect('/');
    }

    // [GET] /users/create-account
    createAccount(req, res, next) {
        res.render('users/create');
    }

    // [POST] /users/sign-up
    signUp(req, res, next) {
        const saltRounds = 10;
        const { username, password, email, fullName, avatar, gender, date, numberPhone, address } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);

        const hash = bcrypt.hashSync(password, salt);

        User.create({
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
            .then((value) => {
                res.redirect('/me/stored/users');
                // res.status(200).json({
                //     message: 'tạo mật khẩu thành công',
                //     hash: hash,
                // });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'Tạo mật khẩu không thành công!',
                });
            });
    }

    // [GET] /users/logout
    logOut(req, res, next) {
        res.clearCookie('token');
        res.redirect('/');
    }

    // [GET] /users/:id/edit
    async edit(req, res, next) {
        await User.findById(req.params.id)
            .then((users) =>
                res.render('users/edit', {
                    users: mongooseToObject(users),
                }),
            )
            .catch(next);
    }

    // [PUT] /users/:id
    async update(req, res, next) {
        await User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/users'))
            .catch(next);
    }

    destroy(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /users/:id/force
    forceDestroy(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /users/:id/restore
    restore(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /users/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                User.delete({ _id: { $in: req.body.userIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is Invalid' });
        }
    }
}

module.exports = new UserController();
