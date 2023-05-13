const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/ApiController');

const decodedPasswordMiddleware = require('../app/middleware/decodedPasswordMiddleware');

// products
router.get('/item', apiController.show);
router.get('/getProductAll', apiController.getProductAll);
router.get('/products/get', apiController.get);
router.get('/products/getById', apiController.getById);

// users
router.post('/users/checkLogin', decodedPasswordMiddleware, apiController.checkLogin);
router.post('/users/createAccount', apiController.createAccount);
router.get('/users/getAllUser', apiController.getAllUser);
router.get('/users/getUser', apiController.getUser);
router.post('/users/post/update', apiController.update);

module.exports = router;
