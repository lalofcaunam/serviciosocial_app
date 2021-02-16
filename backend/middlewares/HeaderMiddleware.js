const logger = require('log4js').getLogger('HeaderMiddleware');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { UsuarioService } = require('../services');

module.exports = {
  validar: async (validar, res, req) => {
    try {

      // Validar que el header no venga vacio
      if(req.headers.idusuario == null || req.headers.idusuario == undefined){
        logger.error('No viene el header idUsuario');
        return handler(Message('No viene el header idUsuario', 400), res, 400);
      }

      // Validar que el usuario exista
      logger.debug('HeaderMiddleware - usuarioExiste: Mandar a llamar al servicio leerUno de Usuario');
      const usuarioEncontrado = await UsuarioService.leerUno(req.headers.idusuario);

      // Si no existe terminar el proceso
      if(!usuarioEncontrado) {
        logger.debug('El usuario no existe');
        logger.info('<< Termina middleware usuarioExiste');
        return handler(Message('El usuario no existe', 404), res, 404);
      }

      // Si regresa false, significa que hubo un error en el servicio
      if(usuarioEncontrado == 'Error') {
          logger.debug('Hubo un error en el servicio leerUno');
          logger.info('<< Termina middleware usuarioExiste');
          return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
      }

      // Validar el rol del usuario
      if(usuarioEncontrado.rol != validar){
        logger.error(`El usuario no tiene el rol de ${validar}`);
        return handler(Message(`El usuario no tiene el rol de ${validar}`, 401), res, 401);
      }

      return true;

   } catch (error) {
     logger.error('Error en middleware validarProfesor: ', error);
     return handler(Message('Error en middleware validarProfesor', 500), res, 500);
   }
  }
};