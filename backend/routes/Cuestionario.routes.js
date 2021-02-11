const express = require('express');

const router = express.Router();

const { CuestionarioController } = require('../controllers');

router.post('/cuestionarios', CuestionarioController.crearUno);

module.exports = router;