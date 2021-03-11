const express = require('express');

const router = express.Router();

const { CuestionarioController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');
const { HeaderValidator, CuestionarioValidator } = require('../validators');

router.post(
    '/cuestionarios',
    HeaderValidator.general,
    CuestionarioValidator.crearUno,
    TokenMiddleware.verifyToken,
    CuestionarioController.crearUno,
);

router.get(
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
);

router.delete(
    '/cuestionarios/:idCuestionario',
    HeaderValidator.general,
    TokenMiddleware.verifyToken,
    CuestionarioController.borrarUno,
);


module.exports = router;