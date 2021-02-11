const logger = require('log4js').getLogger('CuestionarioController');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { CuestionarioService, UsuarioService } = require('../services');

module.exports = {

    // Crear un cuestionario
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');

            // Validar que el usuario existe
            logger.debug('CuestionarioController - crearUno: Mandar a llamar al servicio leerUno de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUno(req.body.idProfesor);

            // Si no existe terminar el proceso
            if(usuarioEncontrado == null) {
                logger.debug('El usuario no existe');
                logger.info('<< Termina controller crearUno');
                return handler(Message('El usuario no existe', 404), res, 404);
            }

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioEncontrado) {
                logger.debug('Hubo un error en el servicio leerUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
            }

            // Crear el cuestionario
            logger.debug('CuestionarioController - crearUno: Mandar a llamar al servicio crearUno de Cuestionario');
            const cuestionarioCreado = await CuestionarioService.crearUno(req.body);

            // Si regresa false, significa que hubo un error en el servicio
            if(!cuestionarioCreado) {
                logger.debug('Hubo un error en el servicio crearUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Hubo un error en el servicio crearUno', 500), res, 500);
            }

            logger.info('<< Termina controller crearUno');
            return handler(Message('ACK, se creo exitosamente el cuestionario', 201), res, 201);

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller crearUno: ', error);
            return handler(Message('Ocurrio un error en el controller crearUno', 500), res, 500);

        }
    },

};