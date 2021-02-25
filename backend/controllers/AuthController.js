const logger = require('log4js').getLogger('AuthController');
const { handler, enviarCorreo, compararContrasenias, crearToken, esNuloIndefinido, crearUrl } = require('../utils');
const { Message } = require('../enum');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const { UsuarioService } = require('../services');
const url = crearUrl();

module.exports = {

    // Registrar usuario
    signup: async (req, res) => {

        try {
            logger.info('>> Inicia controller signup');

            // Revisar si ya existe un usuario con ese correo
            logger.debug('AuthController - signup: Mandar a llamar al servicio leerUnoPorEmail de Usuario');
            const correoExiste = await UsuarioService.leerUnoPorEmail(req.body.correo);

            // Si no regresa true o null, significa que ya existe un usuario con ese correo
            if(!correoExiste || correoExiste[0] != null) {
                logger.info('<< Termina controller signup');
                return handler(Message('Ya existe un usuario con ese correo', 400), res, 400);
            }

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(correoExiste === 'Error') {
                logger.info('<< Termina controller signup');
                return handler(Message('Hubo un error en el servicio leerUnoPorEmail', 500), res, 500);
            }

            // Crear el usuario
            logger.debug('AuthController - signup: Mandar a llamar al servicio crearUno de Usuario');
            const usuarioCreado = await UsuarioService.crearUno(req.body);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioCreado === 'Error') {
                logger.info('<< Termina controller signup');
                return handler(Message('Hubo un error en el servicio crearUno', 500), res, 500);
            }

            // Mandar correo de validacion de email
            logger.debug('AuthController - signup: Mandar a llamar a la utilidad de envio el correo de verificacion');
            const envioCorreo = await enviarCorreo({
                to: usuarioCreado.correo,
                from: process.env.SENDER_SENDGRID, // email de rfl
                templateId: process.env.TEMPLATE_VERIFIEDEMAIL_SENDGRID,
                dynamic_template_data: {
                    nombreUsuario: usuarioEncontrado.nombre, ///usuarios/:token/verificar
                    urlVerificacion: `${url}/usuarios/${token}/verificar`,
                    expiracion: moment().add(20, 'minutes').format('LLL'),
                }
            });

            // Si regresa false, significa que hubo un error en la utilidad
            if(!envioCorreo) {
                logger.debug('Hubo un error en la utilidad enviarCorreo');

                logger.debug('AuthController - signup: Mandar a llamar al servicio borrarUno de Usuario');
                const usuarioEliminado = await UsuarioService.borrarUno(usuarioCreado._id);

                // Si regresa false, significa que hubo un error en el servicio
                if(usuarioEliminado === 'Error') {
                    logger.info('<< Termina controller signup');
                    return handler(Message('Hubo un error en el servicio borrarUno', 500), res, 500);
                }

                logger.info('<< Termina controller signup');
                return handler(Message('Hubo un error en la utilidad enviarCorreo', 500), res, 500);
            }

            logger.info('<< Termina controller signup');
            return handler(Message('ACK, se creo exitosamente el usuario', 201), res, 201);

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller signup: ', error);
            return handler(Message('Ocurrio un error en el controller signup', 500), res, 500);
        }
    },

    // Realizar login y creacion de token para inicio de sesión
    login: async (req, res) => {

        try {
            logger.info('>> Inicia controller login');

            // Buscar al usuario por correo
            logger.debug('AuthController - signup: Mandar a llamar al servicio leerUnoPorEmail de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUnoPorEmail(req.body.correo, true);

            // Si regresa false, significa que el usuario no existe
            if(!usuarioEncontrado) {
                logger.debug('El usuario no existe');
                logger.info('<< Termina controller signup');
                return handler(Message('El usuario no existe', 404), res, 404);
            }

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioEncontrado === 'Error') {
                logger.debug('Hubo un error en el servicio leerUnoPorEmail');
                logger.info('<< Termina controller signup');
                return handler(Message('Hubo un error en el servicio leerUnoPorEmail', 500), res, 500);
            }

            // Comparar la contraseña del usuario
            logger.debug('AuthController - signup: Mandar a llamar a la utilidad de comparar contraseñas');
            const contraseniaCorrecta = compararContrasenias(usuarioEncontrado.contrasenia, req.body.contrasenia);

            // Si regresa false, significa que la constraseña es incorrecta
            if (!contraseniaCorrecta) {
                logger.debug('La contraseña del usuario es incorrecta');
                logger.info('<< Termina controller login');
                return handler(Message('La contraseña del usuario es incorrecta', 404), res, 404);
            }

            // Si el correo no esta activado
            if(!usuarioEncontrado.correoActivado){
                logger.debug('El correo no ha sido activado');
                logger.info('<< Termina controller login');
                return handler(Message('El correo no ha sido activado', 400), res, 400);
            }

            logger.debug('AuthController - signup: Mandar a llamar a la utilidad para crear el token');
            const token = crearToken({
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo,
                rol: usuarioEncontrado.rol
            }, '365d');

            // Si regresa undefined, significa que hubo un error en la utilidad
            if (token === undefined) {
                logger.debug('Hubo un error en la utilidad crearToken');
                logger.info('<< Termina controller login');
                return handler(Message('Hubo un error en la utilidad crearToken', 500), res, 500);
            }

            logger.info('<< Termina controller login');
            return handler(Message(token, 200), res, 200);
         
        } catch (error) {

            // Si existe un error en el login, devolver el error
            logger.error('Error en controller login: ', error);
            return handler(Message('Ocurrio un error en el controller login', 500), res, 500);

        }

    },

    // Enviar la vista 'enviar-email-resetpass'
    pantallaCorreoReset: (req, res) => {
        res.render('enviar-email-resetpass', {
            titulo: 'enviar-email-resetpass',
            endpoint:`${url}/usuarios/reset`
        });
    },

    // Enviar correo para cambio de contraseña
    enviarCorreoReset: async (req, res) => {
        try {
            logger.info('>> Inicia controller enviarCorreoReset');
            logger.debug('Req Body: ', req.body);

            // Buscar al usuario por correo
            logger.debug('AuthController - signup: Mandar a llamar al servicio leerUnoPorEmail de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUnoPorEmail(req.body.correo, true);

            // Si regresa false, significa que el usuario no existe
            if(!usuarioEncontrado) {
                logger.debug('AuthController - enviarCorreoReset: El usuario no existe');
                logger.info('<< Termina controller enviarCorreoReset');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Este usuario no existe'
                });
            }

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioEncontrado === 'Error') {
                logger.debug('AuthController - enviarCorreoReset: Hubo un error en el servicio leerUnoPorEmail');
                logger.info('<< Termina controller signup');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            // Generar token para link del correo
            const token = crearToken({
                idUsuario: usuarioEncontrado._id,
                correo: usuarioEncontrado.correo
            }, '20min', usuarioEncontrado.contrasenia);

            // Mandar correo para cambiar la contraseña
            logger.debug('AuthController - enviarCorreoReset: Mandar a llamar a la utilidad de envio de correo');
            const envioCorreo = await enviarCorreo({
                to: usuarioEncontrado.correo,
                from: process.env.SENDER_SENDGRID,
                templateId: process.env.TEMPLATE_CHANGEPASS_SENDGRID,
                dynamic_template_data: {
                    nombreUsuario: usuarioEncontrado.nombre,
                    urlCambioContrasenia: `${url}/usuarios/reset/${token}`,
                    expiracion: moment().add(20, 'minutes').format('LLL'),
                }
            });

            // Si regresa false, significa que hubo un error en la utilidad
            if(!envioCorreo) {
                logger.debug('Hubo un error en la utilidad enviarCorreo');
                logger.info('<< Termina controller signup');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            logger.info('<< Termina controller enviarCorreoReset');
            return res.render('respuesta-sicorreoexiste-resetpass', {
                titulo: 'Si el correo existe'
            });

        } catch (error) {

            // Si existe un error en el envio, devolver el error
            logger.error(error);
            return res.render('error', {
                titulo: 'Ups',
                error: 'Ocurrio un error inesperado en el servicio'
            });

        }
    },

    // Enviar pantalla para cambio de contraseña
    enviarPantallaReset: async (req, res) => {
        try {
            logger.info('>> Inicia controller enviarPantallaReset');
            logger.debug('Req Params: ', req.params);

            // Validar que no venga nulo el parametro token
            const tokenNuloIndefinido = esNuloIndefinido([req.params.token], ['ParamToken']);
            if(tokenNuloIndefinido.error){
                logger.debug('AuthController - enviarPantallaReset: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller enviarPantallaReset');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            // Buscar al usuario por correo
            logger.debug('AuthController - enviarPantallaReset: Mandar a llamar al servicio leerUnoPorEmail de Usuario');
            const usuarioEncontrado = await UsuarioService.leerUnoPorEmail(jwt.decode(req.params.token).correo, true);

            // Si regresa false, significa que el usuario no existe
            if(!usuarioEncontrado) {
                logger.debug('AuthController - enviarPantallaReset: El usuario no existe');
                logger.info('<< Termina controller signup');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Este usuario no existe'
                });
            }

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioEncontrado === 'Error') {
                logger.debug('AuthController - enviarPantallaReset: Hubo un error en el servicio leerUnoPorEmail');
                logger.info('<< Termina controller enviarPantallaReset');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            let decode = null;

            // Decodificar el token con la llave
            jwt.verify(req.params.token, usuarioEncontrado.contrasenia, function (err, decoded){
                if(err){
                    console.log(err)
                    if(err.name === 'TokenExpiredError'){
                        logger.debug('El token a expirado');
                        logger.info('<< Termina controller enviarPantallaReset');
                        return decode = {
                            error: true,
                            type: err.name,
                            message: `El token expiro el día ${moment(err.expiredAt).format('LLL')}`,
                            code: 500
                        }
                    } else {
                        logger.debug('El token es invalido');
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
                    return res.render('tokenexp-resetpass', {
                        titulo: 'Token Expirado',
                        expiracion: decode.message,
                        correo: usuarioEncontrado.correo,
                        endpoint:`${url}/usuarios/reset`
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

            logger.info('<< Termina controller enviarPantallaReset');
            // Enviar la pantalla para el cambio de contraseña
            return res.render('form-resetpass', {
                titulo: 'Cambio de contraseña',
                nombre: usuarioEncontrado.nombre,
                endpoint:`${url}/usuarios/reset/${usuarioEncontrado.id}`
            });

        } catch (error) {

            // Si existe un error en el envio de la pantalla, devolver el error
            logger.error(error);
            return res.render('error', {
                titulo: 'Ups',
                error: 'Ocurrio un error inesperado en el servicio'
            });

        }
    },

    // Cambiar contraseña del usuario
    reset: async (req, res) => {

        try {
            logger.info('>> Inicia controller reset');
            logger.debug('Req Body: ', req.body);
            logger.debug('Req Params: ', req.params);

            // TODO: validar que los params no vengan nulos "idUsuario"

            // Encriptar contraseña del usuario
            const hashPassword = bcrypt.hashSync(req.body.contrasenia, SALT_WORK_FACTOR);

            // Actualizar la contraseña del usuario
            const usuarioActualizado = await UsuarioService.actualizarUno({_id: req.params.idUsuario, body: {contrasenia: hashPassword} });

            // Si regresa false, significa que el usuario no existe
            if(!usuarioActualizado) {
                logger.debug('AuthController - reset: El usuario no existe');
                logger.info('<< Termina controller reset');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Este usuario no existe'
                });
            }

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(usuarioActualizado === 'Error') {
                logger.debug('AuthController - reset: Hubo un error en el servicio actualizarUno');
                logger.info('<< Termina controller reset');
                return res.render('error', {
                    titulo: 'Ups',
                    error: 'Ocurrio un error inesperado en el servicio'
                });
            }

            // Mandar correo para cambiar la contraseña
            logger.debug('AuthController - reset: Mandar a llamar a la utilidad de envio de correo');
            const envioCorreo = await enviarCorreo({
                to: usuarioActualizado.correo,
                from: process.env.SENDER_SENDGRID,
                templateId: process.env.TEMPLATE_SUCCESSCHANGEPASS_SENDGRID,
                dynamic_template_data: {
                    nombreUsuario: usuarioActualizado.nombre
                }
            });

            // Si regresa false, significa que hubo un error en la utilidad
            if(!envioCorreo) {
                logger.debug('AuthController - reset: Hubo un error en la utilidad enviarCorreo');
                logger.info('<< Termina controller reset');
            }

            logger.info('<< Termina Controller reset');
            res.render('success-resetpass', {
                titulo: 'Exitoso',
                nombre: usuarioActualizado.nombre
            });

        } catch (error) {

            // Si existe un error en la actualización, devolver el error
            logger.error(error);
            return res.render('error', {
                titulo: 'Ups',
                error: 'Ocurrio un error inesperado en el servicio'
            });

        }
    },

};