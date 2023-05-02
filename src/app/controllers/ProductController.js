const Product = require('../models/Product')
// const {mongooseToObject,multipleMongooseToObject} = require('../../util/mongoose')
const path = require('path');


class ProductController {
    async show(req, res, next) {
        try {
            const products = await Product.find({});
            res.json({
                status: 'Successfully!',
                data: products
            });
        } catch (error) {
            next(error);
        }
    }


    async store(req, res, next) {
        try {
            let product = new Product({
                nameProduct: req.body.nameProduct,
                description: req.body.description,
                price: req.body.price,
            });
    
            if(req.file) {
                product.image = req.file.path;
            }
    
            await product.save();
    
            res.json({
                message: 'Product Add Successfully!',
            });
        } catch (error) {
            next(error);
        }
    }    
    
    create(req, res, next) {
        res.render('products/create')
    }

    addProduct(req, res, next) {
        const product = new Product(req.body)
        product.save()
            .then((data) => res.json({
                status: 'success',
                product: data,
                request: req.body
            }))
            .catch(next)
    }
}

module.exports = new ProductController()