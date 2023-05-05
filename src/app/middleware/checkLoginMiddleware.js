const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = process.env.SECRETKEY;

const checkLoginMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).redirect('/users/sign-in');
        }

        const decodedToken = jwt.verify(token, secretKey);
        const infoUser = await User.findOne({ username: decodedToken.username });

        if (!infoUser) {
            next(new Error('Unauthorized'));
        }
        return next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkLoginMiddleware;
