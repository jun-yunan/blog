const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')
const upload = require('../app/middleware/upload')

router.get('/show', productController.show)

router.post('/add', upload.single('image'), productController.store)
router.get('/create', productController.create)
router.post('/addProduct', productController.addProduct)

module.exports = router