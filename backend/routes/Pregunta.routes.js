const express = require('express');

const router = express.Router();

const { PreguntaController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');
const { HeaderValidator, PreguntaValidator } = require('../validators');

router.post(
    '/cuestionarios/:idCuestionario/preguntas',
    HeaderValidator.general,
    PreguntaValidator.crearUno,
    TokenMiddleware.verifyToken,
    PreguntaController.crearUno
);

router.get(
    '/cuestionarios/:idCuestionario/preguntas',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    PreguntaController.leerTodos
);

router.get(
    '/cuestionarios/:idCuestionario/preguntas/:idPregunta',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    PreguntaController.leerUno
);

router.put(
    '/cuestionarios/:idCuestionario/preguntas/:idPregunta',
    HeaderValidator.general,
    PreguntaValidator.actualizarUno,
    TokenMiddleware.verifyToken,
    PreguntaController.actualizarUno
);

router.delete(
    '/cuestionarios/:idCuestionario/preguntas/:idPregunta',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    PreguntaController.borrarUno
);

module.exports = router;