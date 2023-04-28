const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    // [GET] /
    // async index(req, rest) {
    //     try {
    //         const courses = await Course.find({});
    //         res.json(courses);
    //     } catch (err) {
    //         res.status(400).json({ error: 'ERROR!!!' });
    //     }
    // }

    index(req, res, next) {
        Course.find({})
            // .then(courses => res.json(courses))
            .then(courses => {
                res.render('home', { 
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next)
            // res.render('home')
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();