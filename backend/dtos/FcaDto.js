const logger = require('log4js').getLogger('FcaDto');

module.exports = {
    
    // Crear un user
    creacionMasiva: (body, Modelo) => Modelo.insertMany(body).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todos los archivos de una compañia y de un folder
    leerUno: (clave, Modelo) => Modelo.findOne(clave)
        .catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer un archivo
    leerTodos: (Modelo) => Modelo.find().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer un archivo
    leerMuchosPorFiltro: (filtro, Modelo) => Modelo.find(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}