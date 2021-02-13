module.exports = {
    
    // Crear un user
    creacionMasiva: (body, Modelo) => Modelo.insertMany(body).catch(() => 'Error'),

    // Leer todos los archivos de una compañia y de un folder
    leerUno: (clave, Modelo) => Modelo.findOne(clave).catch(() => 'Error'),

    // Leer un archivo
    leerTodos: (Modelo) => Modelo.find().catch(() => 'Error'),

    // Leer un archivo
    leerMuchosPorFiltro: (filtro, Modelo) => Modelo.find(filtro).catch(() => 'Error'),

}