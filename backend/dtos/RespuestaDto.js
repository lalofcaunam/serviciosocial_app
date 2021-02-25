const logger = require('log4js').getLogger('RespuestaDto');
const { Respuesta } = require('../models');

module.exports = {

    // Crear muchas respuestas
    creacionMasiva: (body) => Respuesta.insertMany(body).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer una respuesta
    leerUno: (filtro) => Respuesta.findOne(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas las respuestas de una pregunta
    leerTodosConFiltro: (filtro) => Respuesta.find(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Actualizar una respuesta
    updateOne: (filtro, body) => Respuesta.findOneAndUpdate(filtro, body, { new: true }).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Borrar una respuesta
    deleteOne: (idRespuesta) => Respuesta.findOneAndRemove({_id: idRespuesta}).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}