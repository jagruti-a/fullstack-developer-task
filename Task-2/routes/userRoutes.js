const express = require('express');
const userController = require('../controllers/usersController');
const { validateUser } = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/users', validateUser, userController.createUser);
router.get('/users/search', userController.searchUsers);
router.get('/users', userController.getAllUsers);

module.exports = router;
