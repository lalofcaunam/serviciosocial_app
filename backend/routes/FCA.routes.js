const express = require('express');

const router = express.Router();

const { FCAController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');
const { HeaderValidator, FCAValidator } = require('../validators');

router.get(
    '/fca?',
    HeaderValidator.general,
    FCAValidator.leerTodasLicenciaturasOSemestres,
    TokenMiddleware.verifyToken, 
    FCAController.leerTodasLicenciaturasOSemestres
);
router.get(
    '/fca/asignaturas?',
    HeaderValidator.general,
    FCAValidator.leerTodasAsignaturasFiltro,
    TokenMiddleware.verifyToken,
    FCAController.leerTodasAsignaturasFiltro
);

module.exports = router;