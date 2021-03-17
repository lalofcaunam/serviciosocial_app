const express = require('express');

const router = express.Router();

const { HistorialController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');
const { HeaderValidator } = require('../validators');

router.post(
    '/cuestionarios/:idCuestionario/historiales',
    HeaderValidator.general,
    //PreguntaValidator.crearUno,
    TokenMiddleware.verifyToken,
    HistorialController.crearUno
);

router.get(
    '/cuestionarios/:idCuestionario/historiales',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    HistorialController.leerTodos
);

router.get(
    '/cuestionarios/:idCuestionario/historiales/:idHistorial',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    HistorialController.leerUno
);

module.exports = router;