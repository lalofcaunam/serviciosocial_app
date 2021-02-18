const express = require('express');

const router = express.Router();

const { AuthController } = require('../controllers');
const { AuthValidator } = require('../validators');

router.post('/usuarios/signup', AuthValidator.signup, AuthController.signup);
router.post('/usuarios/login', AuthValidator.login, AuthController.login);

module.exports = router;