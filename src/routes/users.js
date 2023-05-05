const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const decodedPasswordMiddleware = require('../app/middleware/decodedPasswordMiddleware');

router.get('/sign-in', userController.show);

router.post('/login', decodedPasswordMiddleware, userController.login);

router.get('/create-account', userController.createAccount);

router.post('/sign-up', userController.signUp);

router.get('/logout', userController.logOut);

router.post('/handle-form-actions', userController.handleFormActions);
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);
router.patch('/:id/restore', userController.restore);
router.delete('/:id', userController.destroy);
router.delete('/:id/force', userController.forceDestroy);

module.exports = router;
