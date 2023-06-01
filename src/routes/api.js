const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/ApiController');

const decodedPasswordMiddleware = require('../app/middleware/decodedPasswordMiddleware');
const authenticateTokenMiddleware = require('../app/middleware/authenticateTokenMiddleware');

// products
router.get('/products', apiController.getAll);

router.get('/item', apiController.show);
router.get('/getProductAll', apiController.getProductAll);
router.get('/products/getAll', apiController.getAll);
router.get('/products/get', apiController.get);
router.get('/products/getById', apiController.getById);

// users
router.post('/users/checkLogin', decodedPasswordMiddleware, apiController.checkLogin);
router.post('/users/createAccount', apiController.createAccount);
router.get('/users/getAllUser', apiController.getAllUser);
router.get('/users/getUser', apiController.getUser);
router.post('/users/post/update', apiController.update);

// carts
router.post('/carts/addToCart', apiController.addToCart);
router.get('/carts/productInCart', apiController.productInCart);
router.post('/carts/decreaseQuantity', apiController.decreaseQuantity);
router.post('/carts/increaseQuantity', apiController.increaseQuantity);
router.post('/carts/deleteProduct', apiController.deleteProduct);
// router.post('/carts/totalPrice', apiController.totalPrice);
router.post('/carts/searchProduct', apiController.searchProduct);

// search
router.get('/search', authenticateTokenMiddleware, apiController.searchResult);

//
router.get('/getAllUser', apiController.getAllUser);
module.exports = router;
