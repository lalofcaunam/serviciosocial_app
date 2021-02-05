const express = require('express');

const router = express.Router();

const { FCAController } = require('../controllers');

router.get('/fca?', FCAController.leerTodasLicenciaturasOSemestres);
router.get('/fca/asignaturas?', FCAController.leerTodasAsignaturasFiltro);

module.exports = router;