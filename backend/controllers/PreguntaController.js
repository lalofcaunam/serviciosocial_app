const { handler, esNuloIndefinido } = require('../utils');
const { Message } = require('../enum');
const { BusquedaValidator, HeaderValidator } = require('../validators');
const { PreguntaService } = require('../services');
const logger = require('log4js').getLogger('PreguntaController');

module.exports = {

    // Crear una pregunta
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');
            logger.debug('Req Params: ', req.params);
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('PreguntaController - crearUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('PreguntaController - crearUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller crearUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('PreguntaController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            // Validar que el cuestionario exista
            logger.debug('PreguntaController - crearUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
            if( cuestionarioEncontrado.error ) {
                logger.debug('PreguntaController - crearUno:: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
            }

            // Validar que solo una de las respuestas sea la correcta y tenga en el comentario 'Correcta'
            if(req.body.respuestas.filter(respuesta => respuesta.esCorrecta && respuesta.comentario !== 'Correcta').length !== 1){
                logger.debug('PreguntaController - crearUno: La respuesta correcta no tiene en el comentario el valor Correcta o más de una respuesta es correcta');
                logger.info('<< Termina controller crearUno');
                return handler(Message('La respuesta correcta no tiene en el comentario el valor Correcta o más de una respuesta es correcta', 400), res, 400);
            }

            // Crear la pregunta
            logger.debug('PreguntaController - crearUno: Mandar a llamar al servicio PreguntaService.crearUno');
            const preguntaCreada = await PreguntaService.crearUno(Object.assign(req.body, { idCuestionario: cuestionarioEncontrado._id }));

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(preguntaCreada === 'Error') {
                logger.debug('PreguntaController - crearUno: Hubo un error en el servicio PreguntaService.crearUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Hubo un error en el servicio PreguntaService.crearUno', 500), res, 500);
            }

            logger.info('<< Termina controller crearUno');
            return handler(Message('ACK, se creo exitosamente la pregunta', 201), res, 201);

        } catch (error) {

            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller crearUno: ', error);
            return handler(Message('Ocurrio un error en el controller crearUno', 500), res, 500);

        }
    },

    // Leer una pregunta
    leerUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerUno');
            logger.debug('Req Params: ', req.params);

            // Validar rol del usuario
            logger.debug('PreguntaController - leerUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('PreguntaController - leerUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idPregunta y idCuestionario
            const paramsNuloIndefinido = esNuloIndefinido([req.params.idPregunta, req.params.idCuestionario], ['ParamIdPregunta', 'ParamIdCuestionario']);
            if(paramsNuloIndefinido.error){
                logger.debug('PreguntaController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(paramsNuloIndefinido.message, paramsNuloIndefinido.code), res, paramsNuloIndefinido.code);
            }

            // Validar que el cuestionario exista
            logger.debug('PreguntaController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
            if( cuestionarioEncontrado.error ) {
                logger.debug('PreguntaController - leerUno:: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller leerUno');
                return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
            }

            // Validar que la pregunta exista
            logger.debug('PreguntaController - leerUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const preguntaEncontrada = await BusquedaValidator.buscarUno('Pregunta', req.params.idPregunta);
            if( preguntaEncontrada.error ) {
                logger.debug('PreguntaController - leerUno:: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller leerUno');
                return handler(Message(preguntaEncontrada.message, preguntaEncontrada.code), res, preguntaEncontrada.code);
            }

            logger.info('<< Termina controller leerUno');
            return handler(Message(preguntaEncontrada, 200), res, 200);

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
            logger.debug('Req Params: ', req.params);

            // Validar rol del usuario
            logger.debug('PreguntaController - leerTodos: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('PreguntaController - leerTodos: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('PreguntaController - leerTodos: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            let conRespuestas;
            let cuestionarioEncontrado;

            // Validar que tipo de usuario es el que esta consultando
            if(validarUsuario.rol === 'Profesor'){
                // Validar que el cuestionario exista
                logger.debug('PreguntaController - leerTodos: Mandar a llamar al validador BusquedaValidator.buscarUno');
                cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
                if( cuestionarioEncontrado.error ) {
                    logger.debug('PreguntaController - leerTodos:: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerTodos');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }
                conRespuestas = false;
            } else {
                // Validar que el cuestionario exista
                logger.debug('PreguntaController - leerTodos: Mandar a llamar al validador BusquedaValidator.buscarUno');
                cuestionarioEncontrado = await BusquedaValidator.buscarUno('Cuestionario', {_id: req.params.idCuestionario});
                if( cuestionarioEncontrado.error ) {
                    logger.debug('PreguntaController - leerTodos:: Hubo un error en el validador BusquedaValidator.buscarUno');
                    logger.info('<< Termina controller leerTodos');
                    return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
                }
                conRespuestas = true;
            }

            // Buscar las preguntas existentes
            logger.debug('PreguntaController - leerTodos: Mandar a llamar al servicio PreguntaService.leerTodos');
            const preguntasEncontradas = await PreguntaService.leerTodos(cuestionarioEncontrado._id, conRespuestas);

            // Si regresa 'Error', significa que ocurrio un error en el servicio
            if(preguntasEncontradas === 'Error') {
                logger.debug('PreguntaController - leerTodos: Ocurrio un error en el servicio PreguntaService.leerTodos');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('Ocurrio un error en el servicio PreguntaService.leerTodos', 500), res, 500);
            }

            // Si regresa false, significa que no existe ningun cuestionario
            if(!preguntasEncontradas) {
                logger.debug('PreguntaController - leerTodos: No existe ninguna pregunta de ese cuestionario');
                logger.info('<< Termina controller leerTodos');
                return handler(Message('No existe ninguna pregunta de ese cuestionario', 204), res, 204);
            }

            logger.info('<< Termina controller leerUno');
            return handler(Message(preguntasEncontradas, 200), res, 200);

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerTodos: ', error);
            return handler(Message('Ocurrio un error en el controller leerTodos', 500), res, 500);

        }
    },

    // Actualizar un cuestionario
    actualizarUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller actualizarUno');
            logger.debug('Req Params: ', req.params);
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('PreguntaController - actualizarUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('PreguntaController - actualizarUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idPregunta y idCuestionario
            const paramsNuloIndefinido = esNuloIndefinido([req.params.idPregunta, req.params.idCuestionario], ['ParamIdPregunta', 'ParamIdCuestionario']);
            if(paramsNuloIndefinido.error){
                logger.debug('PreguntaController - actualizarUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(paramsNuloIndefinido.message, paramsNuloIndefinido.code), res, paramsNuloIndefinido.code);
            }

            // Validar que el cuestionario exista
            logger.debug('PreguntaController - actualizarUno: Mandar a llamar al validador BusquedaValidator.buscarUno');
            const cuestionarioEncontrado = await BusquedaValidator.buscarUno('CuestionarioProfesor', {_id: req.params.idCuestionario, idProfesor: validarUsuario._id});
            if( cuestionarioEncontrado.error ) {
                logger.debug('PreguntaController - actualizarUno: Hubo un error en el validador BusquedaValidator.buscarUno');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(cuestionarioEncontrado.message, cuestionarioEncontrado.code), res, cuestionarioEncontrado.code);
            }

            // Validar que solo una de las respuestas sea la correcta y tenga en el comentario 'Correcta'
            if(req.body.respuestas.filter(respuesta => respuesta.esCorrecta && respuesta.comentario !== 'Correcta').length !== 1){
                logger.debug('PreguntaController - actualizarUno: La respuesta correcta no tiene en el comentario el valor Correcta o más de una respuesta es correcta');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('La respuesta correcta no tiene en el comentario el valor Correcta o más de una respuesta es correcta', 400), res, 400);
            }

            // Actualizar la pregunta
            logger.debug('PreguntaController - leerUno: Mandar a llamar al servicio PreguntaService.actualizarUno');
            const preguntaActualizada = await PreguntaService.actualizarUno({
                id: req.params.idPregunta,
                body: req.body
            });

            // Validar que no regrese 'Error'
            if(preguntaActualizada === 'Error') {
                logger.debug('PreguntaController - actualizarUno: Ocurrio un error en servicio PreguntaService.actualizarUno');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('Ocurrio un error en servicio PreguntaService.actualizarUno', 500), res, 500);
            }

            // Validar que no regresa false
            if(!preguntaActualizada) {
                logger.debug('PreguntaController - actualizarUno: La pregunta no existe');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('La pregunta no existe', 404), res, 404);
            }

            logger.info('<< Termina controller leerUno');
            return handler(Message('La pregunta se actualizo exitosamente', 200), res, 200);

        } catch (error) {

            // Si existe un error en la actualización, devolver el error
            logger.error('Error en controller actualizarUno: ', error);
            return handler(Message('Ocurrio un error en el controller actualizarUno', 500), res, 500);

        }
    },

};