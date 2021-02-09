const express = require('express');

const router = express.Router();

const { UsuarioController } = require('../controllers');

router.get('/usuarios/:idUsuario/verificar', UsuarioController.validarCorreo);
router.get('/usuarios/:idUsuario/correo', UsuarioController.reenviarCorreo);

module.exports = router;