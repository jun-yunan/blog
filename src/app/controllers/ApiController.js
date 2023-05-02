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
        await Product.findOne({ nameProduct: 'Kiến Thức Nhập Môn IT 75' })
        .then(result => {
            res.json({
                status: 'successfully!!',
                data: result
            });
        })
        .catch(err => {
            throw err;
        });
    }
}

module.exports = new ApiController()