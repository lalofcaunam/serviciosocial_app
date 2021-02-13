const jwt = require('jsonwebtoken');
const { handler } = require('../utils');
const { Message } = require('../enum');
const logger = require('log4js').getLogger('TokenMiddleware');

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const { authorization } = req.headers;

      // Validar que vengan los headers
      if(authorization == null || authorization == undefined){
        logger.error('No viene el Header Authorization, valor: ', authorization);
        return handler(Message('No viene el Header Authorization', 400), res, 400);
      }
      
      // Obtener el valor del token codificado
      const token = authorization.split(' ')[1];

      // Si no viene el valor del token
      if(token == null || token == undefined) {
        logger.error('No viene el token, valor: ', token);
        return handler(Message('No viene el token', 401), res, 401);
      }

      // Decodificar el token con la llave
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Si hubo un error en la decodificacion
      if(!decoded) {
        logger.error('Hubo un error en la decodificación');
        return handler(Message('Hubo un error en la decodificación', 401), res, 401);
      }
 
      // Verificar que el correo este activado
      const correoValido = decoded.correoActivado;

      if(correoValido) next();
     
      else return handler(Message('El correo no ha sido activado', 400), res, 400);

   } catch (error) {
     logger.error('Error en middleware verifyToken: ', error);
     return handler(Message('Error en middleware verifyToken', 500), res, 500);
   }
  },
};