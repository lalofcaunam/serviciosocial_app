const { Usuario } = require('../models');

module.exports = {
    
    // Crear un usuario
    crearUno: (body) => new Usuario(body).save(),

    // Leer un usuario
    leerUno: (filtro) => Usuario.findOne(filtro).catch(() => 'Error'),

    // Leer todas los usuarios
    leerTodos: () => Usuario.find().catch(() => 'Error'),

    // Actualizar un usuario
    updateOne: (idUsuario, body) => Usuario.findByIdAndUpdate({_id: idUsuario}, body, { new: true }).catch(() => 'Error'),

    // Borrar un usuario
    deleteOne: (idUsuario) => Usuario.findByIdAndRemove({_id: idUsuario}).catch(() => 'Error'),

}