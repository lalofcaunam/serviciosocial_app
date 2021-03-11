const express = require('express');

const router = express.Router();

router.use(require('./Configuracion.routes'));
router.use(require('./FCA.routes'));
router.use(require('./Auth.routes'));
router.use(require('./Usuario.routes'));
router.use(require('./Cuestionario.routes'));
router.use(require('./Pregunta.routes'));
router.use(require('./Historial.routes'));

module.exports = router;