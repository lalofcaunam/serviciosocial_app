const express = require('express');

const router = express.Router();

const { FCAController } = require('../controllers');
const { TokenMiddleware } = require('../middlewares');

router.get(
    '/fca?', 
    TokenMiddleware.verifyToken, 
    FCAController.leerTodasLicenciaturasOSemestres
);
router.get(
    '/fca/asignaturas?', 
    TokenMiddleware.verifyToken,
    FCAController.leerTodasAsignaturasFiltro
);

module.exports = router;