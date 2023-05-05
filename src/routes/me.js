const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);
router.get('/stored/products', meController.storedProducts);

router.get('/stored/users', meController.storedUsers);
router.get('/trash/users', meController.trashUser);

router.get('/trash/courses', meController.trashCourses);
router.get('/trash/products', meController.trashProduct);

module.exports = router;
