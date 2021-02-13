const express = require('express');

const router = express.Router();

const { AuthController } = require('../controllers');

router.post('/usuarios/signup', AuthController.signup);
router.post('/usuarios/login', AuthController.login);

module.exports = router;