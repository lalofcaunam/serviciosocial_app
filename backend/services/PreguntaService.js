const logger = require('log4js').getLogger('PreguntaService');
const { PreguntaDto } = require('../dtos');

module.exports = {

    // Crear una pregunta
    crearUno: async (req) => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Llamar al dto PreguntaDto.crearUno
            logger.debug('PreguntaService - crearUno: Realizando creación de una pregunta');
            const preguntaCreada = await PreguntaDto.crearUno(req);

            // Validar que no haya sucedido un error en el dto
            if(preguntaCreada == null){
                logger.debug('PreguntaService - crearUno: Ocurrio un error al tratar de crear la pregunta');
                logger.info('< Termina servicio crearUno');
                return 'Error';
            }

            logger.debug('CuestionarioService - crearUno: Se realizo exitosamente la creacion de una pregunta y sus respuestas');
            logger.info('< Termina servicio crearUno');
            return 'Exitoso';

        } catch (error) {

            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio crearUno: ', error);
            return 'Error';

        }
    },

    // Leer una pregunta
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            // Llamar al dto PreguntaDto.leerUno
            logger.debug('PreguntaService - leerUno: Realizando lectura de un cuestionario');
            const preguntaEncontrada = await PreguntaDto.leerUno({ _id: req });

            // Validar que no haya sucedido un error en el dto
            if(preguntaEncontrada === 'Error'){
                logger.debug('PreguntaService - leerUno: Ocurrio un error al tratar de leer una pregunta');
                logger.info('< Termina servicio leerUno');
                return 'Error';
            }

            // Validar que exista la pregunta
            if(preguntaEncontrada == null){
                logger.debug('PreguntaService - leerUno: No existe ninguna pregunta con ese id');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return preguntaEncontrada;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return 'Error';

        }
    },

    // Leer todas las preguntas
    leerTodos: async (req, conRespuestas = true) => {

        try {
            logger.info('> Inicia servicio leerTodos');

            // Llamar al dto PreguntaDto.leerTodosConFiltro
            logger.debug('PreguntaService - leerTodos: Realizando lectura de todos las preguntas');
            const preguntasEncontradas = await PreguntaDto.leerTodosConFiltro({ idCuestionario: req });

            // Validar que no haya sucedido un error en el dto
            if(preguntasEncontradas === 'Error'){
                logger.debug('PreguntaService - leerTodos: Ocurrio un error al tratar de leer todas las preguntas');
                logger.info('< Termina servicio leerTodos');
                return 'Error';
            }

            // Validar que exista al menos una pregunta
            if(preguntasEncontradas.length === 0){
                logger.debug('PreguntaService - leerTodos: No existe ninguna pregunta');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            // Si no se requiere que las preguntas traigan sus respuestas
            if(!conRespuestas){
                //const jsonStringify = JSON.stringify(preguntasEncontradas);
                const jsonParse = JSON.parse(preguntasEncontradas);
                const preguntasSinRespuestas = jsonParse.forEach(pregunta => delete pregunta.respuestas);
                logger.info('< Termina servicio leerTodos');
                return preguntasSinRespuestas;
            }

            logger.info('< Termina servicio leerTodos');
            return preguntasEncontradas;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return 'Error';

        }
    },

    // Actualizar una pregunta
    actualizarUno: async (req) => {

        try {
            logger.info('> Inicia servicio actualizarUno');

            // Llamar al dto PreguntaDto.updateOne
            logger.debug('PreguntaService - actualizarUno: Realizando actualización de una respuesta');
            const preguntaActualizada = await PreguntaDto.updateOne({ _id: req.id }, req.body);

            // Validar que no haya sucedido un error en el dto
            if(preguntaActualizada === 'Error'){
                logger.debug('PreguntaService - actualizarUno: Ocurrio un error al tratar de actualizar una pregunta');
                logger.info('< Termina servicio actualizarUno');
                return 'Error';
            }

            // Validar que exista la pregunta
            if(preguntaActualizada == null){
                logger.debug('PreguntaService - actualizarUno: No existe ninguna pregunta con ese id');
                logger.info('< Termina servicio actualizarUno');
                return false;
            }

            logger.info('< Termina servicio actualizarUno');
            return 'Exitoso';

        } catch (error) {

            // Si existe un error en la actualización, devolver el error
            logger.error('Error en servicio actualizarUno: ', error);
            return 'Error';

        }
    },

};