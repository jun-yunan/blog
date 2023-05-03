const express = require('express')
const router = express.Router()

const apiController = require('../app/controllers/ApiController')

router.get('/item', apiController.show)
router.get('/getProductAll', apiController.getProductAll)
router.get('/products/get', apiController.get)



module.exports = router