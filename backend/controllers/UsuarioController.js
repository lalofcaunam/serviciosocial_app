const jwt = require("jsonwebtoken");
const moment = require('moment');
const logger = require('log4js').getLogger('UsuarioController');
const { enviarCorreo, crearToken, esNuloIndefinido, crearUrl } = require('../utils');
const { UsuarioService } = require('../services');

module.exports = {

    // Activar el correo del usuario
    validarCorreo: async (req, res) => {

        try {
            logger.info('>> Inicia controller validarCorreo');
            logger.debug('Req Params: ', req.params);

            // Validar que no venga nulo el parametro idUsuario
            logger.debug('UsuarioController - validarCorreo: Mandara a llamar a la utilidad esNuloIndefinido');
            const tokenNuloIndefinido = esNuloIndefinido([req.params.token], ['ParamToken']);
            if(tokenNuloIndefinido.error){
                logger.debug('UsuarioController - validarCorreo: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller validarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'El token enviado esta vacio'
                });
            }

            // Buscar al usuario por id
            logger.debug('UsuarioController - validarCorreo: Mandar a llamar al servicio UsuarioService.leerUno');
            const usuarioEncontrado = await UsuarioService.leerUno(jwt.decode(req.params.token).idUsuario);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioEncontrado === 'Error') {
                logger.debug('UsuarioController - validarCorreo: Hubo un error en el servicio UsuarioService.leerUno');
                logger.info('<< Termina controller validarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Hubo un error en el servicio'
                });
            }

            // Si regresa false, significa que no existe el usuario
            if(!usuarioEncontrado) {
                logger.debug('UsuarioController - validarCorreo: El usuario no existe');
                logger.info('<< Termina controller validarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'El usuario no existe'
                });
            }

            let decode = null;

            // Decodificar el token con la llave
            jwt.verify(req.params.token, process.env.JWT_SECRET, function (err, decoded){
                if(err){
                    if(err.name === 'TokenExpiredError'){
                        logger.debug('UsuarioController - validarCorreo: El token a expirado');
                        logger.info('<< Termina controller enviarPantallaReset');
                        return decode = {
                            error: true,
                            type: err.name,
                            message: `El token expiro el día ${moment(err.expiredAt).format('LLL')}`,
                            code: 500
                        }
                    } else {
                        logger.debug('UsuarioController - validarCorreo: El token es invalido');
                        logger.info('<< Termina controller enviarPantallaReset');
                        return decode = {
                            error: true,
                            type: err.name,
                            message: `El token es invalido`,
                            code: 500
                        }
                    }
                } else decode = decoded;
            });

            if(decode.error){
                // Si el error es por expiracion del token, mandar pantalla para reenviar correo
                if(decode.type === 'TokenExpiredError'){
                    return res.render('tokenexp', {
                        titulo: 'Token Expirado',
                        expiracion: decode.message,
                        correo: usuarioEncontrado.correo,
                        endpoint:`${crearUrl()}/usuarios/reset`
                    });
                }
                // Si el error es por que el token es invalido, mandar pantalla de error
                else{
                    return res.render('error', {
                        titulo: 'Ups',
                        error: 'Ocurrio un error inesperado en el servicio'
                    });
                }
            }

            const actualizacion = {
                _id: usuarioEncontrado._id,
                body: {
                    correoActivado: true
                }
            };

            // Actualizar el campo correoActivado a true
            logger.debug('UsuarioController - validarCorreo: Mandar a llamar al servicio UsuarioService.actualizarUno');
            const usuarioActualizado = await UsuarioService.actualizarUno(actualizacion);

            // Si regresa false, significa que hubo un error en el servicio
            if(!usuarioActualizado) {
                logger.debug('Hubo un error en el servicio UsuarioService.actualizarUno');
                logger.info('<< Termina controller validarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            logger.info('<< Termina controller validarCorreo');
            res.render('success', {
                titulo: 'Exitoso',
                nombre: usuarioActualizado.nombre,
                mensaje: 'tu correo ha sido validado exitosamente'
            });

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller validarCorreo: ', error);
            return res.render('error', {
                titulo: 'Ups',
                error: 'Hubo un error en el servicio'
            });
        }
    },

    // Reenviar el correo de activación
    reenviarCorreo: async (req, res) => {

        try {
            logger.info('>> Inicia controller reenviarCorreo');
            logger.debug('Req Params: ', req.params);

            // Validar que no venga nulo el parametro idUsuario
            logger.debug('UsuarioController - reenviarCorreo: Mandara a llamar a la utilidad esNuloIndefinido');
            const idUsuarioNuloIndefinido = esNuloIndefinido([req.params.idUsuario], ['ParamIdUsuario']);
            if(idUsuarioNuloIndefinido.error){
                logger.debug('UsuarioController - reenviarCorreo: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller reenviarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'El parametro del usuario esta vacio'
                });
            }

            // Buscar al usuario por id
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar al servicio UsuarioService.leerUno');
            const usuarioEncontrado = await UsuarioService.leerUno(req.params.idUsuario);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioEncontrado === 'Error') {
                logger.debug('UsuarioController - reenviarCorreo: Hubo un error en el servicio UsuarioService.leerUno');
                logger.info('<< Termina controller reenviarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Hubo un error en el servicio'
                });
            }

            // Si regresa false, significa que no existe el usuario
            if(!usuarioEncontrado) {
                logger.debug('UsuarioController - reenviarCorreo: El usuario no existe');
                logger.info('<< Termina controller reenviarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'El usuario no existe'
                });
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
            logger.debug('UsuarioController - reenviarCorreo: Mandar a llamar a la utilidad enviarCorreo');
            const envioCorreo = await enviarCorreo(msg);

            // Si regresa false, significa que hubo un error en la utilidad
            if(!envioCorreo) {
                logger.debug('UsuarioController - reenviarCorreo: Hubo un error en la utilidad enviarCorreo');
                logger.info('<< Termina controller reenviarCorreo');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Hubo un error en el servicio'
                });
            }

            logger.info('<< Termina controller reenviarCorreo');
            res.render('success', {
                titulo: 'Exitoso',
                nombre: usuarioEncontrado.nombre,
                mensaje: 'tu correo ha reenvio exitosamente'
            });
         
        } catch (error) {

            // Si existe un error en el login, devolver el error
            logger.error('Error en controller reenviarCorreo: ', error);
            return res.render('error', {
                titulo: 'Ups',
                error: 'Hubo un error en el servicio'
            });

        }

    },

};