const logger = require('log4js').getLogger('UsuarioService');
const { UsuarioDto } = require('../dtos');

module.exports = {

    // Leer un usuario por email
    leerUnoPorEmail: async (req) => {

        try {
            logger.info('> Inicia servicio leerUnoPorEmail');

            // Llamar al dto UsuarioDto.leerTodos
            const usuarios = await UsuarioDto.leerTodos();

            // Si no regresa [], ya existe al menos un usuario
            if(usuarios.length != 0 ){
                // Llamar al dto UsuarioDto.leerUno
                logger.debug('UsuarioService - leerUnoPorEmail: Realizando lectura de un usuario por email');
                const usuarioEncontrado = await UsuarioDto.leerUno({ correo: req });

                // Validar que no haya sucedido un error en el dto
                if(usuarioEncontrado == 'Error') {
                    logger.debug('UsuarioService - leerUnoPorEmail: Ocurrio un error al tratar de leer un usuario por email');
                    logger.info('< Termina servicio leerUnoPorEmail');
                    return false;
                }

                logger.debug('usuarioEncontrado: ', usuarioEncontrado);
                logger.info('< Termina servicio leerUnoPorEmail');
                return usuarioEncontrado;
            }

            logger.info('< Termina servicio leerUnoPorEmail');
            return usuarios;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUnoPorEmail: ', error);
            return false;

        }
    },

    // Crear un usuario
    crearUno: async (req) => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Llamar al dto UsuarioDto.crearUno
            logger.debug('UsuarioService - crearUno: Realizando creación de un usuario');
            const usuarioCreado = await UsuarioDto.crearUno(req);

            // Validar que no haya sucedido un error en el dto
            if(usuarioCreado == null){
                logger.debug('UsuarioService - crearUno: Ocurrio un error al tratar de crear el usuario');
                logger.info('< Termina servicio crearUno');
                return false;
            }

            logger.debug('UsuarioService - crearUno: Se realizo exitosamente la creacion del usuario');
            logger.info('< Termina servicio crearUno');
            return usuarioCreado;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio crearUno: ', error);
            return false;

        }
    },

    // Leer un usuario
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            // Llamar al dto UsuarioDto.leerUno
            logger.debug('UsuarioService - leerUno: Realizando lectura de un usuario');
            const usuarioEncontrado = await UsuarioDto.leerUno({ _id: req})

            // Validar que no haya sucedido un error en el dto
            if(usuarioEncontrado == 'Error'){
                logger.debug('UsuarioService - leerUno: Ocurrio un error al tratar de leer un usuario');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return usuarioEncontrado;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return false;

        }
    },

    // Actualizar un usuario
    actualizarUno: async (req) => {

        try {
            logger.info('> Inicia servicio actualizarUno');

            // Llamar al dto UsuarioDto.updateOne
            logger.debug('UsuarioService - actualizarUno: Realizando actualización de un usuario');
            const usuarioActualizado = await UsuarioDto.updateOne(req._id, req.body);

            // Validar que no haya sucedido un error en el dto
            if(usuarioActualizado == 'Error'){
                logger.debug('UsuarioService - actualizarUno: Ocurrio un error al tratar de actualizar un usuario');
                logger.info('< Termina servicio actualizarUno');
                return false;
            }

            logger.info('< Termina servicio actualizarUno');
            return usuarioActualizado;

        } catch (error) {
            
            // Si existe un error en la actualización, devolver el error
            logger.error('Error en servicio actualizarUno: ', error);
            return false;

        }
    },

    // Borrar un usuario
    borrarUno: async (req) => {

        try {
            logger.info('> Inicia servicio borrarUno');

            // Llamar al dto UsuarioDto.deleteOne
            logger.debug('UsuarioService - leerUno: Realizando el borrado de un usuario');
            const usuarioBorrado = await UsuarioDto.deleteOne(req);

            // Validar que no haya sucedido un error en el dto
            if(usuarioBorrado == 'Error'){
                logger.debug('UsuarioService - borrarUno: Ocurrio un error al tratar de borrar un usuario');
                logger.info('< Termina servicio borrarUno');
                return false;
            }

            logger.info('< Termina servicio borrarUno');
            return usuarioBorrado;

        } catch (error) {
            
            // Si existe un error en el borrado, devolver el error
            logger.error('Error en servicio borrarUno: ', error);
            return false;

        }
    },

};