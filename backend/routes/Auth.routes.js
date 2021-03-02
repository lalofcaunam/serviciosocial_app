const express = require('express');

const router = express.Router();

const { AuthController } = require('../controllers');
const { AuthValidator } = require('../validators');

router.post('/usuarios/signup', AuthValidator.signup, AuthController.signup);
router.post('/usuarios/login', AuthValidator.login, AuthController.login);
router.post('/usuarios/reset?', AuthValidator.enviarCorreoReset, AuthController.enviarCorreoReset);
router.post('/usuarios/reset/:idUsuario', AuthValidator.reset, AuthController.reset);
router.get('/usuarios/reset/:token', AuthController.enviarPantallaReset);

module.exports = router;