const Course = require('../models/Course')
const Product = require('../models/Product')


class ApiController {
    async show(req, res, next) {
        await Course.find({})
            .then((course) => {
                res.json({
                    status: 'successfully!!!',
                    success: true,
                    data: course
                })
            })
            .catch(next)
    }

    async getProductAll(req, res, next) {
        await Product.find({})
        .then(products => {
            res.json({
                status: 'successfully!!',
                data: products
            });
        })
        .catch(err => {
            throw err;
        });
    }

    //[GET] /api/products/get
    async get(req, res, next) {
        await Product.find({type: req.query.typeProduct})
            .then(products => {
                res.json({
                    query: req.query,
                    status: 'successfully!!',
                    data: products
                });
            })
            .catch(err => {
                throw err;
            });
    }
}

module.exports = new ApiController()