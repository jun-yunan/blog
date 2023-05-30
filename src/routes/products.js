const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const upload = require('../app/middleware/upload');

router.get('/show', productController.show);
router.post('/handle-form-actions', productController.handleFormActions);

router.post('/add', upload.single('image'), productController.store);
router.get('/create', productController.create);
router.post('/addProduct', productController.addProduct);

router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
// router.delete('/:id', productController.destroy);
router.delete('/:id', productController.forceDestroy);
router.delete('/:id/force', productController.forceDestroy);

module.exports = router;
