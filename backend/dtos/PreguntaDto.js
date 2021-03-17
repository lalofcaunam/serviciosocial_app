const logger = require('log4js').getLogger('PreguntaDto');
const { Pregunta } = require('../models');

module.exports = {

    // Crear una pregunta
    crearUno: (body) => new Pregunta(body).save().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer una pregunta
    leerUno: (filtro) => Pregunta.findOne(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas las preguntas de un cuestionario
    leerTodosConFiltro: (filtro) => Pregunta.find(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Actualizar una pregunta
    updateOne: (filtro, body) => Pregunta.findOneAndUpdate(filtro, body, { new: true }).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Borrar una pregunta
    deleteOne: (idPregunta) => Pregunta.findOneAndRemove({_id: idPregunta}).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}