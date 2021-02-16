const express = require('express');

const router = express.Router();

const { CuestionarioController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');

router.post(
    '/cuestionarios', 
    TokenMiddleware.verifyToken, 
    CuestionarioController.crearUno
);

module.exports = router;