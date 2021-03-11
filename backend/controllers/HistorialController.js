const { handler, esNuloIndefinido, formatearJson } = require('../utils');
const { Message } = require('../enum');
const { BusquedaValidator, HeaderValidator } = require('../validators');
const { HistorialService } = require('../services');
const logger = require('log4js').getLogger('HistorialController');
const moment = require('moment-business-days');

module.exports = {

    // Crear un historial (realizar un cuestionario)
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');
            logger.debug('Req Params: ', req.params);
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('HistorialController - crearUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Alumno', req);
            if(validarUsuario.error) {
                logger.debug('HistorialController - crearUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller crearUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('HistorialController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            // Validar que el cuestionario exista
            logger.debug('HistorialController - crearUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const cuestionarioEncontrado = await BusquedaValidator.buscarUno('Cuestionario', {_id: req.params.idCuestionario, estatus: true});
            if( cuestionarioEncontrado.error ) {
                logger.debug('HistorialController - crearUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
            }

            // Contar las respuestas buenas y malas
            let buenas = 0;
            let malas = 0;

            req.body.respuestas.forEach(respuesta => {
                if(respuesta.respuesta.esCorrecta) buenas += 1;
                else malas += 1;
            });

            // Agregar los campos faltantes al body
            Object.assign(req.body, {
                idCuestionario: req.params.idCuestionario,
                idAlumno: req.headers.idusuario,
                fechaRealizacion: moment().format('L'),
                buenas: buenas,
                malas: malas
            });

            // Crear el historial
            logger.debug('HistorialController - crearUno: Mandar a llamar al servicio HistorialService.crearUno');
            const historialCreado = await HistorialService.crearUno(req.body);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(historialCreado === 'Error') {
                logger.debug('HistorialController - crearUno: Hubo un error en el servicio HistorialService.crearUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Hubo un error en el servicio HistorialService.crearUno', 500), res, 500);
            }

            logger.info('<< Termina controller crearUno');
            return handler(Message(historialCreado, 201), res, 201);

        } catch (error) {

            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller crearUno: ', error);
            return handler(Message('Ocurrio un error en el controller crearUno', 500), res, 500);

        }
    },

    // Leer un historial
    leerUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerUno');
            logger.debug('Req Params: ', req.params);

            // Validar rol del usuario
            logger.debug('HistorialController - leerUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('HistorialController - leerUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idHistorial y idCuestionario
            const paramsNuloIndefinido = esNuloIndefinido([req.params.idHistorial, req.params.idCuestionario], ['ParamIdHistorial', 'ParamIdCuestionario']);
            if(paramsNuloIndefinido.error){
                logger.debug('HistorialController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(paramsNuloIndefinido.message, paramsNuloIndefinido.code), res, paramsNuloIndefinido.code);
            }

            let historialEncontrado;

            // Validar que tipo de usuario es el que esta consultando
            if(validarUsuario.rol === 'Profesor'){
                // Validar que el cuestionario exista
                logger.debug('HistorialController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
                const cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
                if( cuestionarioEncontrado.error ) {
                    logger.debug('HistorialController - leerUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }

                // Validar que el historial exista
                logger.debug('HistorialController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
                historialEncontrado = await BusquedaValidator.buscarUno('Historial', { _id: req.params.idHistorial, idCuestionario: cuestionarioEncontrado });
                if( historialEncontrado.error ) {
                    logger.debug('HistorialController - leerUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message(historialEncontrado.message, historialEncontrado.code), res, historialEncontrado.code);
                }

                historialEncontrado = formatearJson(historialEncontrado);
                delete historialEncontrado.idAlumno;
            } else {
                // Validar que el cuestionario exista
                logger.debug('HistorialController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
                const cuestionarioEncontrado = await BusquedaValidator.buscarUno('Cuestionario', { _id: req.params.idCuestionario, estatus: true });
                if( cuestionarioEncontrado.error ) {
                    logger.debug('HistorialController - leerUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }

                // Validar que el historial exista
                logger.debug('HistorialController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
                historialEncontrado = await BusquedaValidator.buscarUno('Historial', { _id: req.params.idHistorial, idCuestionario: cuestionarioEncontrado, idAlumno: validarUsuario._id });
                if( historialEncontrado.error ) {
                    logger.debug('HistorialController - leerUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerUno');
                    return handler(Message(historialEncontrado.message, historialEncontrado.code), res, historialEncontrado.code);
                }
            }

            logger.info('<< Termina controller leerUno');
            return handler(Message(historialEncontrado, 200), res, 200);

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerUno: ', error);
            return handler(Message('Ocurrio un error en el controller leerUno', 500), res, 500);

        }
    },

    // Leer todos los historiales
    leerTodos: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerTodos');
            logger.debug('Req Params: ', req.params);

            // Validar rol del usuario
            logger.debug('HistorialController - leerTodos: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('HistorialController - leerTodos: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('HistorialController - leerTodos: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            let historialesEncontrados;

            // Validar que tipo de usuario es el que esta consultando
            if(validarUsuario.rol === 'Profesor'){
                // Validar que el cuestionario exista
                logger.debug('HistorialController - leerTodos: Mandar a llamar al validador BusquedaValidator.buscarUno');
                const cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
                if( cuestionarioEncontrado.error ) {
                    logger.debug('HistorialController - leerTodos: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerTodos');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }

                // Buscar los historiales de ese cuestionario
                logger.debug('HistorialController - leerTodos: Mandar a llamar al servicio HistorialService.leerTodos');
                historialesEncontrados = await HistorialService.leerTodos({ idCuestionario: cuestionarioEncontrado._id });

            } else {
                // Validar que el cuestionario exista
                logger.debug('HistorialController - leerTodos: Mandar a llamar al validador BusquedaValidator.buscarUno');
                const cuestionarioEncontrado = await BusquedaValidator.buscarUno('Cuestionario', { _id: req.params.idCuestionario, estatus: true });
                if( cuestionarioEncontrado.error ) {
                    logger.debug('HistorialController - leerTodos: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerTodos');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }

                // Buscar los historiales de ese cuestionario
                logger.debug('HistorialController - leerTodos: Mandar a llamar al servicio HistorialService.leerTodos');
                historialesEncontrados = await HistorialService.leerTodos({ idCuestionario: cuestionarioEncontrado._id, idAlumno: validarUsuario._id });

            }

            // Si regresa 'Error', significa que ocurrio un error en el servicio
            if(historialesEncontrados === 'Error') {
                logger.debug('HistorialController - leerTodos: Ocurrio un error en el servicio HistorialService.leerTodos');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('Ocurrio un error en el servicio HistorialService.leerTodos', 500), res, 500);
            }

            // Si regresa false, significa que no existe ningun historial
            if(!historialesEncontrados) {
                logger.debug('HistorialController - leerTodos: No existe ningun historial de ese cuestionario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('No existe ningun historial de ese cuestionario', 204), res, 204);
            }

            if(validarUsuario.rol === 'Profesor'){
                historialesEncontrados = formatearJson(historialesEncontrados);
                historialesEncontrados.forEach(historial => delete historial.idAlumno);
            }

            logger.info('<< Termina controller leerTodos');
            return handler(Message(historialesEncontrados, 200), res, 200);

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerTodos: ', error);
            return handler(Message('Ocurrio un error en el controller leerTodos', 500), res, 500);

        }
    },

};