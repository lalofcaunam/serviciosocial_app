const { Config } = require('../models');

module.exports = {
    
    // Crear una configuracion
    crearUno: (body) => new Config(body).save().catch(() => null),

    // Leer todas las configuraciones
    leerTodos: () => Config.find().catch(() => null),

}