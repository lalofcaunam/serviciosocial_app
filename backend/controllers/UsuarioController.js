const jwt = require("jsonwebtoken");
const moment = require('moment');
const logger = require('log4js').getLogger('UsuarioController');
const { handler, enviarCorreo, crearToken, esNuloIndefinido, crearUrl } = require('../utils');
const { Message } = require('../enum');
const { UsuarioService } = require('../services');

module.exports = {

    // Activar el correo del usuario
    validarCorreo: async (req, res) => {

        try {
            logger.info('>> Inicia controller validarCorreo');
            logger.debug('Req Params: ', req.params);

            // Validar que no venga nulo el parametro idUsuario
            const tokenNuloIndefinido = esNuloIndefinido([req.params.token], ['ParamToken']);
            if(tokenNuloIndefinido.error){
                logger.debug('UsuarioController - validarCorreo: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message(tokenNuloIndefinido.message, tokenNuloIndefinido.code), res, tokenNuloIndefinido.code);
            }

            let decode = null;

            // Decodificar el token con la llave
            jwt.verify(req.params.token, process.env.JWT_SECRET, function (err, decoded){
                if(err){
                    if(err.name === 'TokenExpiredError'){
                        logger.debug('El token a expirado');
                        logger.info('<< Termina controller validarCorreo');
                        return decode = {
                            error: true,
                            message: `El token expiro el día ${moment(err.expiredAt).format('LLL')}`,
                            code: 500
                        }
                    }
                } else decode = decoded;
            });

            if(decode.error){
                return handler(Message(decode.message, decode.code), res, decode.code);
            }

            // Buscar al usuario por id
            logger.debug('UsuarioController - validarCorreo: Mandar a llamar al servicio leerUno de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUno(decoded.idUsuario);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioEncontrado) {
                logger.debug('Hubo un error en el servicio leerUno');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
            }

            const actualizacion = {
                _id: usuarioEncontrado._id,
                body: {
                    correoActivado: true
                }
            };

            // Actualizar el campo correoActivado a true
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
            logger.debug('Req Params: ', req.params);

            // Validar que no venga nulo el parametro idUsuario
            const idUsuarioNuloIndefinido = esNuloIndefinido([req.params.idUsuario], ['ParamIdUsuario']);
            if(idUsuarioNuloIndefinido.error){
                logger.debug('UsuarioController - reenviarCorreo: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller reenviarCorreo');
                return handler(Message(idUsuarioNuloIndefinido.message, idUsuarioNuloIndefinido.code), res, idUsuarioNuloIndefinido.code);
            }

            // Buscar al usuario por id
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar al servicio leerUno de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUno(req.params.idUsuario);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioEncontrado) {
                logger.debug('Hubo un error en el servicio leerUno');
                logger.info('<< Termina controller validarCorreo');
                return handler(Message('Hubo un error en el servicio leerUno', 500), res, 500);
            }

            const token = crearToken({idUsuario:usuarioEncontrado._id}, '20min');

            const msg = {
                to: usuarioEncontrado.correo,
                from: process.env.SENDER_SENDGRID,
                templateId: process.env.TEMPLATE_SENDGRID,
                dynamic_template_data: {
                    urlVerificacion: `${crearUrl()}/usuarios/${token}/verificar`,
                    nombreUsuario: usuarioEncontrado.nombre,
                    expiracion: moment().add(20, 'minutes').format('LLL')
                }
            };

            // Mandar correo de validacion de email
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar a la utilidad de envio el correo de verificacion');
            const envioCorreo = await enviarCorreo(msg);

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