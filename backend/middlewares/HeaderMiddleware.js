const logger = require('log4js').getLogger('HeaderMiddleware');
const { UsuarioService } = require('../services');

module.exports = {
  validarProfesor: (req, res, next) => {
    try {
      const { idUsuario } = req.headers;

      // Validar que venga el header idUsuario
      if(idUsuario == null || idUsuario == undefined){
        logger.error('No viene el Header idUsuario, valor: ', idUsuario);
        return handler(Message('No viene el Header idUsuario', 400), res, 400);
      }

      // Validar que el usuario exista
      const usuarioEncontrado = await this.usuarioExiste(idUsuario);

      // Validar el rol del usuario
      if(usuarioEncontrado.rol != 'Profesor'){
        logger.error('El usuario no tiene el rol de Profesor');
        return handler(Message('El usuario no tiene el rol de Profesor', 401), res, 401);
      }

      next();

   } catch (error) {
     logger.error('Error en middleware validarProfesor: ', error);
     return handler(Message('Error en middleware validarProfesor', 500), res, 500);
   }
  },
  validarAlumno: (req, res, next) => {
    try {
      const { idUsuario } = req.headers;

      // Validar que venga el header idUsuario
      if(idUsuario == null || idUsuario == undefined){
        logger.error('No viene el Header idUsuario, valor: ', idUsuario);
        return handler(Message('No viene el Header idUsuario', 400), res, 400);
      }

      // Validar que el usuario exista
      const usuarioEncontrado = await this.usuarioExiste(idUsuario);

      // Validar el rol del usuario
      if(usuarioEncontrado.rol != 'Alumno'){
        logger.error('El usuario no tiene el rol de Alumno');
        return handler(Message('El usuario no tiene el rol de Alumno', 401), res, 401);
      }

      next();

   } catch (error) {
     logger.error('Error en middleware validarAlumno: ', error);
     return handler(Message('Error en middleware validarAlumno', 500), res, 500);
   }
  },
  validarUsuario: (req, res, next) => {
    try {
      const { idUsuario } = req.headers;

      // Validar que venga el header idUsuario
      if(idUsuario == null || idUsuario == undefined){
        logger.error('No viene el Header idUsuario, valor: ', idUsuario);
        return handler(Message('No viene el Header idUsuario', 400), res, 400);
      }

      // Validar que el usuario exista
      const usuarioEncontrado = await this.usuarioExiste(idUsuario);

      // Validar el rol del usuario
      if(usuarioEncontrado.rol != null){
        logger.error('El usuario no tiene un rol');
        return handler(Message('El usuario no tiene un rol', 401), res, 401);
      }

      next();

   } catch (error) {
     logger.error('Error en middleware validarUsuario: ', error);
     return handler(Message('Error en middleware validarUsuario', 500), res, 500);
   }
  },
  usuarioExiste: async (idUsuario) => {
      try {
        // Validar que el usuario existe
        logger.debug('HeaderMiddleware - usuarioExiste: Mandar a llamar al servicio leerUno de Usuario');
        const usuarioEncontrado = await UsuarioService.leerUno(idUsuario);

        // Si no existe terminar el proceso
        if(usuarioEncontrado == null) {
            logger.debug('El usuario no existe');
            logger.info('<< Termina middleware usuarioExiste');
            return handler(Message('El usuario no existe', 404), res, 404);
        }

        // Si regresa false, significa que hubo un error en el servicio
        if(!usuarioEncontrado) {
            logger.debug('Hubo un error en el servicio leerUno');
            logger.info('<< Termina middleware usuarioExiste');
            return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
        }

        return usuarioEncontrado;

      } catch (error) {
          logger.error('Error en middleware usuarioExiste: ', error);
          return handler(Message('Error en middleware usuarioExiste', 500), res, 500);
      }
  }
};