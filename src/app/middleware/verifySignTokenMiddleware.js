const jwt = require('jsonwebtoken');
const User = require('../models/User');
var cookieParser = require('cookie-parser');
const secretKey = process.env.SECRETKEY;

const verifySignTokenMiddleware = async (req, res, next) => {
    try {
        const username = req.username;

        const user = { username };

        const token = jwt.sign(user, secretKey, { expiresIn: '1d' });

        const nameCookie = 'token';
        const valueCookie = token;

        res.cookie(nameCookie, valueCookie);

        return next();

        // res.json({
        //     status: true,
        //     message: 'Check Login successfully',
        //     token,
        // });
    } catch (error) {
        // res.json({
        //     status: false,
        //     message: 'Check Login fail',
        //     error,
        // });
        next(error);
    }
};

module.exports = verifySignTokenMiddleware;
