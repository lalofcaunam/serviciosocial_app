const { Cuestionario } = require('../models');

module.exports = {
    
    // Crear un cuestionario
    crearUno: (body) => new Cuestionario(body).save(),

    // Leer un cuestionario
    leerUno: (filtro) => Cuestionario.findOne(filtro).catch(() => 'Error'),

    // Leer todas los cuestionarios
    leerTodos: () => Usuario.find().catch(() => 'Error'),

    // Leer todas los cuestionarios
    leerTodosConFiltro: (filtro) => Cuestionario.find(filtro).catch(() => 'Error'),

    // Actualizar un cuestionario
    updateOne: (idCuestionario, body) => Cuestionario.findByIdAndUpdate({_id: idCuestionario}, body, { new: true }).catch(() => 'Error'),

    // Borrar un cuestionario
    deleteOne: (idCuestionario) => Cuestionario.findByIdAndRemove({_id: idCuestionario}).catch(() => 'Error'),

}