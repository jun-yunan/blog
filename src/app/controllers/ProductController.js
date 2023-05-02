const Product = require('../models/Product')
const {mongooseToObject,multipleMongooseToObject} = require('../../util/mongoose')
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

    // [GET] /products/:id/edit
    async edit(req, res, next) {
        await Product.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: mongooseToObject(product)
            }))
            .catch(next)
    }

    // [PUT] /products/:id
    async update(req, res, next) {
        await Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    destroy(req,res,next) {
        Product.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /products/:id/force
    forceDestroy(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /products/:id/restore
    restore(req, res, next) {
        Product.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /products/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Product.delete({_id: {$in: req.body.productIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is Invalid'})
        }
    }
}

module.exports = new ProductController()