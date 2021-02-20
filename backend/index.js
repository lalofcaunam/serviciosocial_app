// Requerimos dotenv para manipular variables globales desde un archivo .env, logger para logs y mongoose para conexion a la BD de Mongo
require('dotenv').config();
const logger = require('log4js').getLogger('index');
const mongoose = require('mongoose');

process.env.TZ = 'America/Mexico_City';

// Importamos las constantes del archivo index que se encuentra en la carpeta ./api y ./mongo
const { api, PORT } = require('./api');
const { MONGO_URI } = require('./mongo');

// Conexion a la base de datos de Mongo
mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  )
    .then(() => logger.info('>>>> Base de Datos Mongo, Conectada <<<<'))
    .catch((err) => logger.error('Error en la conexion de la base de datos: ', err));

// Ponemos a escuchar al servidor en el puerto definido y mostramos en consola un mensaje para conocer esto
api.listen(PORT, () => {
  logger.info(`Ruta levantada: ${process.env.PROTOCOL}://${process.env.HOSTNAME}:${PORT}/ssfca/api/v1`);
});
