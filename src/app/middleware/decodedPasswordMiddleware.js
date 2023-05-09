const User = require('../models/User');
const bcrypt = require('bcrypt');

const decodedPasswordMiddleware = async (req, res, next) => {
    const { username, password } = req.body;
    const userInfo = await User.findOne({ username: username });

    if (!userInfo) {
        return res.json({
            status: false,
            message: 'Không tìm thấy tài khoản',
        });
    }

    let checkPassword = bcrypt.compareSync(password, userInfo.password);

    if (checkPassword) {
        req.username = req.body.username;
        next();
    } else {
        return res.json({
            status: false,
            message: 'Sai mật khẩu',
        });
    }
};

module.exports = decodedPasswordMiddleware;
