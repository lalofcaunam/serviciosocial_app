const express = require('express');

const router = express.Router();

const { ConfiguracionController } = require('../controllers');

router.post('/configuracion', ConfiguracionController.crearUno);

module.exports = router;