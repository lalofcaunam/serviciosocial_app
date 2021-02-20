const logger = require('log4js').getLogger('ConfiguracionDto');
const { Config } = require('../models');

module.exports = {
    
    // Crear una configuracion
    crearUno: (body) => new Config(body).save().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas las configuraciones
    leerTodos: () => Config.find().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}