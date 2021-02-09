const logger = require('log4js').getLogger('UsuarioController');
const { handler, enviarCorreo } = require('../utils');
const { Message } = require('../enum');
const { UsuarioService } = require('../services');

module.exports = {

    // Activar el correo del usuario
    validarCorreo: async (req, res) => {

        try {
            logger.info('>> Inicia controller validarCorreo');

            // Validar que el parametro no venga vacio
            // TODO:

            // Buscar al usuario por id
            logger.debug('UsuarioController - validarCorreo: Mandar a llamar al servicio leerUno de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUno(req.params.idUsuario);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioEncontrado) {
                logger.debug('Hubo un error en el servicio leerUno');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
            }

            const actualizacion = {
                _id: usuarioEncontrado._id,
                body: {
                    emailActivado: true
                }
            };

            // Actualizar el campo emailActivado a true
            logger.debug('UsuarioController - validarCorreo: Mandar a llamar al servicio actualizarUno de Usuario');
            const usuarioActualizado = await UsuarioService.actualizarUno(actualizacion);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioActualizado) {
                logger.debug('Hubo un error en el servicio actualizarUno');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message('Hubo un error en el servicio actualizarUno', 500), res, 500);
            }

            logger.info('<< Termina controller validarCorreo');
            return handler(Message('Correo validado exitosamente', 200), res, 200);

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller validarCorreo: ', error);
            return handler(Message('Ocurrio un error en el controller validarCorreo', 500), res, 500);
        }
    },

    // Reenviar el correo de activación
    reenviarCorreo: async (req, res) => {

        try {
            logger.info('>> Inicia controller reenviarCorreo');

            // Validar que el parametro no venga vacio
            // TODO:

            // Buscar al usuario por id
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar al servicio leerUno de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUno(req.params.idUsuario);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioEncontrado) {
                logger.debug('Hubo un error en el servicio leerUno');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
            }

            // Mandar correo de validacion de email
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar a la utilidad de envio el correo de verificacion');
            const envioCorreo = await enviarCorreo(usuarioEncontrado);

            // Si regresa false, significa que hubo un error en la utilidad
            if(!envioCorreo) {
                logger.debug('Hubo un error en la utilidad enviarCorreo');
                logger.info('<< Termina controller reenviarCorreo');
                return handler(Message('Hubo un error en la utilidad enviarCorreo', 500), res, 500);
            }

            logger.info('<< Termina controller reenviarCorreo');
            return handler(Message('Tu correo se reenvio exitosamente', 200), res, 200);
         
        } catch (error) {

            // Si existe un error en el login, devolver el error
            logger.error('Error en controller reenviarCorreo: ', error);
            return handler(Message('Ocurrio un error en el controller reenviarCorreo', 500), res, 500);

        }

    },

};