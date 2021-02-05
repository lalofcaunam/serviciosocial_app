module.exports = {
    
    // Crear un user
    creacionMasiva: (body, Modelo) => Modelo.insertMany(body).catch(() => null),

    // Leer todos los archivos de una compañia y de un folder
    leerUno: (clave, Modelo) => Modelo.findOne(clave).catch(() => null),

    // Leer un archivo
    leerTodos: (Modelo) => Modelo.find().catch(() => null),

    // Leer un archivo
    leerMuchosPorFiltro: (filtro, Modelo) => Modelo.find(filtro).catch(() => null),

}