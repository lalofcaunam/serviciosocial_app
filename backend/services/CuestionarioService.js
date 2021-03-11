const logger = require('log4js').getLogger('CuestionarioService');
const { CuestionarioDto } = require('../dtos');

module.exports = {

    // Crear un cuestionario
    crearUno: async (req) => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Llamar al dto CuestionarioDto.crearUno
            logger.debug('CuestionarioService - crearUno: Realizando creación de un cuestionario');
            const cuestinarioCreado = await CuestionarioDto.crearUno(req);

            // Validar que no haya sucedido un error en el dto
            if(cuestinarioCreado == null){
                logger.debug('CuestionarioService - crearUno: Ocurrio un error al tratar de crear el cuestionario');
                logger.info('< Termina servicio crearUno');
                return 'Error';
            }

            logger.debug('CuestionarioService - crearUno: Se realizo exitosamente la creacion del cuestionario');
            logger.info('< Termina servicio crearUno');
            return cuestinarioCreado;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio crearUno: ', error);
            return 'Error';

        }
    },

    // Leer un cuestionario
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            // Llamar al dto CuestionarioDto.leerUno
            logger.debug('CuestionarioService - leerUno: Realizando lectura de un cuestionario');
            const cuestionarioEncontrado = await CuestionarioDto.leerUno(req);

            // Validar que no haya sucedido un error en el dto
            if(cuestionarioEncontrado === 'Error'){
                logger.debug('CuestionarioService - leerUno: Ocurrio un error al tratar de leer un cuestionario');
                logger.info('< Termina servicio leerUno');
                return 'Error';
            }

            // Validar que exista el cuestionario
            if(cuestionarioEncontrado == null){
                logger.debug('CuestionarioService - leerUno: No existe ningun cuestionario con ese id');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return cuestionarioEncontrado;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return 'Error';

        }
    },

    // Leer todos los cuestionarios
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            // Llamar al dto CuestionarioDto.leerTodos
            logger.debug('CuestionarioService - leerTodos: Realizando lectura de todos los cuestionarios');
            const cuestionariosEncontrados = await CuestionarioDto.leerTodosConFiltro({ estatus: true });

            // Validar que no haya sucedido un error en el dto
            if(cuestionariosEncontrados === 'Error'){
                logger.debug('CuestionarioService - leerTodos: Ocurrio un error al tratar de leer todos los cuestionarios');
                logger.info('< Termina servicio leerTodos');
                return 'Error';
            }

            // Validar que exista al menos un cuestionario
            if(cuestionariosEncontrados.length === 0){
                logger.debug('CuestionarioService - leerTodos: No existe ningun cuestionario');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return cuestionariosEncontrados;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return 'Error';

        }
    },

    // Leer todos los cuestionarios por profesor
    leerTodosPorProfesor: async (req) => {

        try {
            logger.info('> Inicia servicio leerTodosPorProfesor');

            // Llamar al dto CuestionarioDto.leerTodosConFiltro
            logger.debug('CuestionarioService - leerTodosPorProfesor: Realizando lectura de todos los cuestionarios');
            const cuestionariosEncontrados = await CuestionarioDto.leerTodosConFiltro({ idProfesor: req });

            // Validar que no haya sucedido un error en el dto
            if(cuestionariosEncontrados === 'Error'){
                logger.debug('CuestionarioService - leerTodosPorProfesor: Ocurrio un error al tratar de leer todos los cuestionarios por profesor');
                logger.info('< Termina servicio leerTodosPorProfesor');
                return 'Error';
            }

            // Validar que exista al menos un cuestionario
            if(cuestionariosEncontrados.length === 0){
                logger.debug('CuestionarioService - leerTodos: No existe ningun cuestionario para ese profesor');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodosPorProfesor');
            return cuestionariosEncontrados;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodosPorProfesor: ', error);
            return 'Error';

        }
    },

    // Actualizar un cuestionario
    actualizarUno: async (req) => {

        try {
            logger.info('> Inicia servicio actualizarUno');

            // Llamar al dto CuestionarioDto.updateOne
            logger.debug('CuestionarioService - actualizarUno: Realizando actualización de un cuestionario');
            const cuestionarioActualizado = await CuestionarioDto.updateOne(req.filtro, req.body);

            // Validar que no haya sucedido un error en el dto
            if(cuestionarioActualizado === 'Error'){
                logger.debug('CuestionarioService - actualizarUno: Ocurrio un error al tratar de actualizar un cuestionario');
                logger.info('< Termina servicio actualizarUno');
                return 'Error';
            }

            // Validar que exista el cuestionario
            if(cuestionarioActualizado == null){
                logger.debug('CuestionarioService - actualizarUno: No existe ningun cuestionario con ese id');
                logger.info('< Termina servicio actualizarUno');
                return false;
            }

            logger.info('< Termina servicio actualizarUno');
            return cuestionarioActualizado;

        } catch (error) {
            
            // Si existe un error en la actualización, devolver el error
            logger.error('Error en servicio actualizarUno: ', error);
            return 'Error';

        }
    },

    // Borrar un cuestionario
    borrarUno: async (req) => {

        try {
            logger.info('> Inicia servicio borrarUno');

            // Llamar al dto CuestionarioDto.deleteOne
            logger.debug('CuestionarioService - leerUno: Realizando el borrado de un cuestionario');
            const cuestionarioBorrado = await CuestionarioDto.deleteOne(req.idCuestionario, req.idProfesor);

            // Validar que no haya sucedido un error en el dto
            if(cuestionarioBorrado === 'Error'){
                logger.debug('CuestionarioService - borrarUno: Ocurrio un error al tratar de borrar un cuestionario');
                logger.info('< Termina servicio borrarUno');
                return 'Error';
            }

            // Validar que exista el cuestionario
            if(cuestionarioBorrado == null){
                logger.debug('CuestionarioService - borrarUno: No existe ningun cuestionario con ese id');
                logger.info('< Termina servicio borrarUno');
                return false;
            }

            logger.info('< Termina servicio borrarUno');
            return cuestionarioBorrado;

        } catch (error) {
            
            // Si existe un error en el borrado, devolver el error
            logger.error('Error en servicio borrarUno: ', error);
            return 'Error';

        }
    },

};