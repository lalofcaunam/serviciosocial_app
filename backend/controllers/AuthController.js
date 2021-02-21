const logger = require('log4js').getLogger('AuthController');
const { handler, enviarCorreo, compararContrasenias, crearToken } = require('../utils');
const { Message } = require('../enum');
const { UsuarioService } = require('../services');

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
            const envioCorreo = await enviarCorreo(usuarioCreado);

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

};