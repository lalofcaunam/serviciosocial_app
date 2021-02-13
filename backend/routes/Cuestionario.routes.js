const express = require('express');

const router = express.Router();

const { CuestionarioController } = require('../controllers');
const { TokenMiddleware, HeaderMiddleware } = require('../middlewares');

router.post('/cuestionarios', TokenMiddleware.verifyToken, HeaderMiddleware.validarProfesor, CuestionarioController.crearUno);

module.exports = router;