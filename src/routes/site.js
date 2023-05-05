const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const checkLoginMiddleware = require('../app/middleware/checkLoginMiddleware');

router.get('/search', siteController.search);
router.get('/', checkLoginMiddleware, siteController.index);

module.exports = router;
