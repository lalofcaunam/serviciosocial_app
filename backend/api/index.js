// Usamos la dependencias instaladas y las guardamos en una constante 
const express = require('express');
const cors = require('cors');
const path = require('path');
const log4js = require('log4js');
const logger = require('log4js').getLogger('index');
const { isCelebrateError } = require('celebrate');
const { handler } = require('../utils')

// Configuración de logger
log4js.configure('./config/log4js.json');

// Definimos una constante para utilizar las funciones de Express y definimos el puerto donde se levantara el servidor
const api = express();
const PORT = process.env.PORT || 3000;

// Disable the fingerprinting of this web technology
api.disable("x-powered-by");

// Configuramos el motor de vistas
api.set('views', path.join(__dirname, '../views'));
api.set('view engine', 'pug');

// Definimos los siguientes middlewares para utilizar morgan y evitar que nos salgan los warnings en consola de Express
// Agregamos el middleware de cors para permitir peticiones (en nuestro caso no definiremos permisos de IP)
api.use(cors());
api.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
api.use(express.urlencoded({ extended: true }));
api.use(express.json({ express: true }));
api.use(express.static(path.join(__dirname, '../public')));
api.use(process.env.BASE_PATH, require('../routes'));

// Handler errors de validaciones celebrate
api.use(((err, req, res, next) => {
  
    // Si no es un error de Celebrate, continuar con el siguiente proceso
    if (!isCelebrateError(err)) {
      next(err);
    }
  
    // Iniciarlizar variable para mapear del error
    const validation = {};
  
    // Por cada error que se encuentre en celebrate, asignarlo a 'validation'
    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        source: segment,
        keys: joiError.details.map((detail) => detail.path.join('.')),
        message: joiError.message,
      };
    }
  
    // Construir objeto que se respondera
    const result = {
      message: err.message,
      validation,
    };
  
    // Responder el error
    logger.error('Result: ', result);
    return handler(result, res, 400);
  }));

// Establecemos el endpoint para probar que el servidor responda y un mensaje para indentificar esta acción
api.get('/', (req, res) => res.send('El endpoint raiz, responde correctamente!'));

// Exportamos nuestras constantes de api y PORT para que se utilicen en el archivo principal
module.exports = { api, PORT };
