const express = require('express');

const router = express.Router();

const { FCAController } = require('../controllers');
const { TokenMiddleware, HeaderMiddleware } = require('../middlewares');

router.get('/fca?', TokenMiddleware.verifyToken, HeaderMiddleware.validarProfesor, FCAController.leerTodasLicenciaturasOSemestres);
router.get('/fca/asignaturas?', TokenMiddleware.verifyToken, HeaderMiddleware.validarProfesor, FCAController.leerTodasAsignaturasFiltro);

module.exports = router;