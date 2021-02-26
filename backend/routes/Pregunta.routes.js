const express = require('express');

const router = express.Router();

const { PreguntaController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');
const { HeaderValidator, PreguntaValidor } = require('../validators');

router.post(
    '/preguntas',
    HeaderValidator.general,
    PreguntaValidor.crearUno,
    TokenMiddleware.verifyToken,
    PreguntaController.crearUno,
);

/*router.get(
    '/cuestionarios',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    CuestionarioController.leerTodos,
);

router.get(
    '/cuestionarios/:idCuestionario',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    CuestionarioController.leerUno,
);

router.put(
    '/cuestionarios/:idCuestionario',
    HeaderValidator.general,
    CuestionarioValidator.actualizarUno,
    TokenMiddleware.verifyToken,
    CuestionarioController.actualizarUno,
);*/


module.exports = router;