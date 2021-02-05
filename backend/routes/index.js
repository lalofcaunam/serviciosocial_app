const express = require('express');

const router = express.Router();

router.use(require('./Configuracion.routes'));
router.use(require('./FCA.routes'));

module.exports = router;