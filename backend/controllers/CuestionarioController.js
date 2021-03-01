const logger = require('log4js').getLogger('CuestionarioController');
const { handler, esNuloIndefinido } = require('../utils');
const { Message } = require('../enum');
const { BusquedaValidator, HeaderValidator } = require('../validators');
const { CuestionarioService } = require('../services');
const moment = require('moment-business-days');

module.exports = {

    // Crear un cuestionario
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('CuestionarioController - crearUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - crearUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller crearUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que la asignatura exista y de la asignatura encontrada, agregar los campos claveLicenciatura y claveSemestre
            logger.debug('CuestionarioController - crearUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const asignaturaEncontrada = await BusquedaValidator.buscarUno('Asignatura', req.body.claveAsignatura);
            if( asignaturaEncontrada.error ) {
                logger.debug('CuestionarioController - crearUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message(asignaturaEncontrada.message, asignaturaEncontrada.code), res, asignaturaEncontrada.code);
            }

            // Validar que coincidan los valores del req (claveLicenciatura y claveSemestre) con los de la asignatura
            if(
                asignaturaEncontrada.claveLicenciatura.filter((licenciatura) => licenciatura === req.body.claveLicenciatura).length === 0 ||
                asignaturaEncontrada.claveSemestre.filter((semestre) => semestre === req.body.claveSemestre).length === 0
            ){
                logger.debug('CuestionarioController - crearUno: El valor de la claveLicenciatura o claveSemestre, no coincide con la asignatura');
                logger.info('<< Termina controller crearUno');
                return handler(Message('El valor de la claveLicenciatura o claveSemestre, no coincide con la asignatura', 400), res, 400);
            }

            // Agregar al campo fechaCreacion, el valor de moment().format('L')
            // Agregar al campo idProfesor, el valor del Header idUsuario
            // Agregar al campo claveAsignatura, el valor de asignaturaEncontrada.clave
            // Agregar al campo claveLicenciatura, el valor de req.body.claveLicenciatura
            // Agregar al campo claveSemestre, el valor de req.body.claveSemestre
            const body = Object.assign(req.body, {
                fechaCreacion: moment().format('L'),
                idProfesor: req.headers.idusuario,
                claveAsignatura: asignaturaEncontrada.clave,
                claveLicenciatura: req.body.claveLicenciatura,
                claveSemestre: req.body.claveSemestre,
            });

            // Crear el cuestionario
            logger.debug('CuestionarioController - crearUno: Mandar a llamar al servicio CuestionarioService.crearUno');
            const cuestionarioCreado = await CuestionarioService.crearUno(body);

            // Si regresa false, significa que hubo un error en el servicio
            if(cuestionarioCreado === 'Error') {
                logger.debug('CuestionarioController - crearUno: Hubo un error en el servicio CuestionarioService.crearUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Hubo un error en el servicio CuestionarioService.crearUno', 500), res, 500);
            }

            logger.info('<< Termina controller crearUno');
            return handler(Message('ACK, se creo exitosamente el cuestionario', 201), res, 201);

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller crearUno: ', error);
            return handler(Message('Ocurrio un error en el controller crearUno', 500), res, 500);

        }
    },

    // Leer un cuestionario
    leerUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerUno');
            logger.debug('Req Params: ', req.params);

            // Validar rol del usuario
            logger.debug('CuestionarioController - leerUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - leerUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            logger.debug('CuestionarioController - leerUno: Mandar a llamar a la utilidad esNuloIndefinido');
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('CuestionarioController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            let cuestionarioEncontrado;

            // Si el usuario es Profesor
            if(validarUsuario.rol === 'Profesor'){
                // Validar que el cuestionario exista
                logger.debug('CuestionarioController - leerUno: Mandar a llamar al servicio CuestionarioService.leerUno');
                cuestionarioEncontrado = await CuestionarioService.leerUno({_id: req.params.idCuestionario, idProfesor: validarUsuario._id});

                // Validar que no regrese 'Error'
                if(cuestionarioEncontrado === 'Error') {
                    logger.debug('CuestionarioController - leerUno: Ocurrio un error en servicio CuestionarioService.leerUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message('Ocurrio un error en servicio CuestionarioService.leerUno', 500), res, 500);
                }

                // Validar que no regresa false
                if(!cuestionarioEncontrado) {
                    logger.debug('CuestionarioController - leerUno: El cuestionario no existe');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message('El cuestionario no existe', 404), res, 404);
                }
            } else {
                // Validar que el cuestionario exista
                logger.debug('CuestionarioController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
                cuestionarioEncontrado = await BusquedaValidator.buscarUno('Cuestionario', req.params.idCuestionario);
                if( cuestionarioEncontrado.error ) {
                    logger.debug('CuestionarioController - leerUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }
            }

            logger.info('<< Termina controller leerUno');
            return handler(Message(cuestionarioEncontrado, 200), res, 200);

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerUno: ', error);
            return handler(Message('Ocurrio un error en el controller leerUno', 500), res, 500);

        }
    },

    // Leer todos los cuestionarios
    leerTodos: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerTodos');

            // Validar rol del usuario
            logger.debug('CuestionarioController - leerTodos: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - leerTodos: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            let cuestionariosEncontrados;

            // Si el rol del usuario es Profesor
            if(validarUsuario.rol === 'Profesor'){
                // Buscar todos los cuestionarios por profesor
                logger.debug('CuestionarioController - leerTodos: Mandar a llamar al servicio CuestionarioService.leerTodosPorProfesor');
                cuestionariosEncontrados = await CuestionarioService.leerTodosPorProfesor(validarUsuario._id);
            } else {
                // Buscar todos los cuestionarios
                logger.debug('CuestionarioController - leerTodos: Mandar a llamar al servicio CuestionarioService.leerTodos');
                cuestionariosEncontrados = await CuestionarioService.leerTodos();
            }

            // Si regresa 'Error', significa que ocurrio un error en el servicio
            if(cuestionariosEncontrados === 'Error') {
                logger.debug('CuestionarioController - leerTodos: Ocurrio un error en el servicio CuestionarioService');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('Ocurrio un error en el servicio CuestionarioService', 500), res, 500);
            }

            // Si regresa false, significa que no existe ningun cuestionario
            if(!cuestionariosEncontrados) {
                logger.debug('CuestionarioController - leerTodos: No existe ningun cuestionario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('No existe ningun cuestionario', 204), res, 204);
            }

            logger.info('<< Termina controller leerTodos');
            return handler(Message(cuestionariosEncontrados, 200), res, 200);

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerTodos: ', error);
            return handler(Message('Ocurrio un error en el controller leerTodos', 500), res, 500);

        }
    },

    // Actualizar un cuestionario
    actualizarUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerUno');
            logger.debug('Req Params: ', req.params);
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('CuestionarioController - actualizarUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - actualizarUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            logger.debug('CuestionarioController - actualizarUno: Mandar a llamar a la utilidad esNuloIndefinido');
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('CuestionarioController - actualizarUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            // Actualizar el cuestionario
            logger.debug('CuestionarioController - actualizarUno: Mandar a llamar al servicio CuestionarioService.actualizarUno');
            const cuestionarioActualizado = await CuestionarioService.actualizarUno({
                filtro: {
                    _id: req.params.idCuestionario,
                    idProfesor: validarUsuario._id
                },
                body: req.body
            });

            // Validar que no regrese 'Error'
            if(cuestionarioActualizado === 'Error') {
                logger.debug('CuestionarioController - actualizarUno: Ocurrio un error en servicio CuestionarioService.actualizarUno');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('Ocurrio un error en servicio CuestionarioService.actualizarUno', 500), res, 500);
            }

            // Validar que no regresa false
            if(!cuestionarioActualizado) {
                logger.debug('CuestionarioController - actualizarUno: El cuestionario no existe');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('El cuestionario no existe', 404), res, 404);
            }

            logger.info('<< Termina controller actualizarUno');
            return handler(Message('El cuestionario se ha actualizado exitosamente', 200), res, 200);

        } catch (error) {

            // Si existe un error en la actualización, devolver el error
            logger.error('Error en controller actualizarUno: ', error);
            return handler(Message('Ocurrio un error en el controller actualizarUno', 500), res, 500);

        }
    },

};