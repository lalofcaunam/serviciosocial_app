const logger = require('log4js').getLogger('HistorialDto');
const { Historial } = require('../models');

module.exports = {

    // Crear un historial (realizar un cuestionario)
    crearUno: (body) => new Historial(body).save().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer un historial
    leerUno: (filtro) => Historial.findOne(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todos las historiales de un cuestionario
    leerTodosConFiltro: (filtro) => Historial.find(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}