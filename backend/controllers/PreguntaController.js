const { handler, esNuloIndefinido } = require('../utils');
const { Message } = require('../enum');
const { BusquedaValidator, HeaderValidator } = require('../validators');
const { PreguntaService, CuestionarioService } = require('../services');
const logger = require('log4js').getLogger('PreguntaController');

module.exports = {

    // Crear una pregunta
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');
            logger.debug('Req Body: ', req.body);

            // Validar rol del usuario
            logger.debug('PreguntaController - crearUno: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('PreguntaController - crearUno: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller crearUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que el cuestionario exista
            logger.debug('PreguntaController - crearUno: Mandar a llamar al servicio CuestionarioService.leerUno');
            const cuestionarioEncontrado = await CuestionarioService.leerUno({_id: req.body.idCuestionario, idProfesor: validarUsuario._id});

            // Validar que no regrese 'Error'
            if(cuestionarioEncontrado === 'Error') {
                logger.debug('PreguntaController - crearUno: Ocurrio un error en servicio CuestionarioService.leerUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en servicio CuestionarioService.leerUno', 500), res, 500);
            }

            // Validar que no regresa false
            if(!cuestionarioEncontrado) {
                logger.debug('PreguntaController - crearUno: El cuestionario no existe');
                logger.info('<< Termina controller crearUno');
                return handler(Message('El cuestionario no existe', 400), res, 400);
            }

            if(req.body.respuestas.filter(respuesta => respuesta.esCorrecta && respuesta.comentario !== 'Correcto').length !== 0){
                logger.debug('PreguntaController - crearUno: La respuesta correcta no tiene en el comentario el valor Correcto');
                logger.info('<< Termina controller crearUno');
                return handler(Message('La respuesta correcta no tiene en el comentario el valor Correcto', 400), res, 400);
            }

            // Crear la pregunta
            logger.debug('PreguntaController - crearUno: Mandar a llamar al servicio PreguntaService.crearUno');
            const preguntaCreada = await PreguntaService.crearUno(req.body);

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

            // Validar que no venga nulo el parametro idPregunta
            const idPreguntaNuloIndefinido = esNuloIndefinido([req.params.idPregunta], ['ParamIdPregunta']);
            if(idPreguntaNuloIndefinido.error){
                logger.debug('PreguntaController - leerUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller leerUno');
                return handler(Message(idPreguntaNuloIndefinido.message, idPreguntaNuloIndefinido.code), res, idPreguntaNuloIndefinido.code);
            }

            /**
             * 1. Buscar a la pregunta
             * 2. Validar que no venga 'Error'
             * 3. Validar que no venga false
             */

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
            const validarUsuario = await HeaderValidator.idUsuario(null, req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - leerTodos: Hubo un error en el validador buscarUno');
                logger.info('<< Termina controller leerTodos');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            let cuestionariosEncontrados;

            // Si el rol del usuario es Profesor
            if(validarUsuario.rol === 'Profesor'){
                // Buscar todos los cuestionarios por profesor
                logger.debug('CuestionarioController - leerTodos: Mandar a llamar al servicio leerTodosPorProfesor de Cuestionario');
                cuestionariosEncontrados = await CuestionarioService.leerTodosPorProfesor(validarUsuario._id);
            } else {
                // Buscar todos los cuestionarios
                logger.debug('CuestionarioController - leerTodos: Mandar a llamar al servicio leerTodos de Cuestionario');
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
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('CuestionarioController - actualizarUno: Hubo un error en el validador buscarUno');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Validar que no venga nulo el parametro idCuestionario
            const idCuestionarioNuloIndefinido = esNuloIndefinido([req.params.idCuestionario], ['ParamIdCuestionario']);
            if(idCuestionarioNuloIndefinido.error){
                logger.debug('CuestionarioController - actualizarUno: Hubo un error en la utilidad esNuloIndefinido');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message(idCuestionarioNuloIndefinido.message, idCuestionarioNuloIndefinido.code), res, idCuestionarioNuloIndefinido.code);
            }

            // Actualizar el cuestionario
            logger.debug('CuestionarioController - actualizarUno: Mandar a llamar al servicio actualizarUno de Cuestionario');
            const cuestionarioActualizado = await CuestionarioService.actualizarUno({
                filtro: {
                    _id: req.params.idCuestionario,
                    idProfesor: validarUsuario._id
                },
                body: req.body
            });

            // Validar que no regrese 'Error'
            if(cuestionarioActualizado === 'Error') {
                logger.debug('CuestionarioController - actualizarUno: Ocurrio un error en servicio actualizarUno');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('Ocurrio un error en servicio actualizarUno', 500), res, 500);
            }

            // Validar que no regresa false
            if(!cuestionarioActualizado) {
                logger.debug('CuestionarioController - actualizarUno: El cuestionario no existe');
                logger.info('<< Termina controller actualizarUno');
                return handler(Message('El cuestionario no existe', 400), res, 400);
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