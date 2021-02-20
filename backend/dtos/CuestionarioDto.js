const logger = require('log4js').getLogger('CuestionarioDto');
const { Cuestionario } = require('../models');

module.exports = {
    
    // Crear un cuestionario
    crearUno: (body) => new Cuestionario(body).save().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer un cuestionario
    leerUno: (filtro) => Cuestionario.findOne(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas los cuestionarios
    leerTodos: () => Cuestionario.find().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas los cuestionarios
    leerTodosConFiltro: (filtro) => Cuestionario.find(filtro).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Actualizar un cuestionario
    updateOne: (idCuestionario, body) => Cuestionario.findByIdAndUpdate({_id: idCuestionario}, body, { new: true }).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Borrar un cuestionario
    deleteOne: (idCuestionario) => Cuestionario.findByIdAndRemove({_id: idCuestionario}).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}