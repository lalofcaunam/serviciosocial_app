const { Config } = require('../models');

module.exports = {
    
    // Crear una configuracion
    crearUno: (body) => new Config(body).save().catch(() => 'Error'),

    // Leer todas las configuraciones
    leerTodos: () => Config.find().catch(() => 'Error'),

}