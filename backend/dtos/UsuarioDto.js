const logger = require('log4js').getLogger('UsuarioDto');
const { Usuario } = require('../models');

module.exports = {
    
    // Crear un usuario
    crearUno: (body) => new Usuario(body).save().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer un usuario
    leerUno: (filtro) => Usuario.findOne(filtro)
        .catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Leer todas los usuarios
    leerTodos: () => Usuario.find().catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Actualizar un usuario
    updateOne: (idUsuario, body) => Usuario.findByIdAndUpdate({_id: idUsuario}, body, { new: true }).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

    // Borrar un usuario
    deleteOne: (idUsuario) => Usuario.findByIdAndRemove({_id: idUsuario}).catch((err) => {
        logger.error(err);
        return 'Error'
    }),

}