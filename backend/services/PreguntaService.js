const logger = require('log4js').getLogger('PreguntaService');
const { PreguntaDto, RespuestaDto } = require('../dtos');

module.exports = {

    // Crear una pregunta y sus respuestas
    crearUno: async (pregunta, respuestas) => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Llamar al dto PreguntaDto.crearUno
            logger.debug('PreguntaService - crearUno: Realizando creación de una pregunta');
            const preguntaCreada = await PreguntaDto.crearUno(pregunta);

            // Validar que no haya sucedido un error en el dto
            if(preguntaCreada == null){
                logger.debug('PreguntaService - crearUno: Ocurrio un error al tratar de crear la pregunta');
                logger.info('< Termina servicio crearUno');
                return 'Error';
            }

            // Agregar a cada objeto de respuesta el idPregunta, con la preguntaCreada
            respuestas.map(respuesta => Object.assign(respuesta, { idPregunta: preguntaCreada._id }));

            // Llamar al dto RespuestaDto.crearMuchos
            logger.debug('PreguntaService - crearUno: Realizando creación de muchas respuestas');
            const respuestasCreadas = await RespuestaDto.creacionMasiva(respuestas);

            // Validar que no haya sucedido un error en el dto
            if(respuestasCreadas == null){
                logger.debug('PreguntaService - crearUno: Ocurrio un error al tratar de crear las respuestas');

                // Llamar al dto PreguntaDto.deleteOne
                logger.debug('PreguntaService - crearUno: Realizando borrado de una pregunta');
                const preguntaBorrada = await PreguntaDto.deleteOne(preguntaCreada._id);

                // Validar que no haya sucedido un error en el dto
                if(preguntaBorrada == null){
                    logger.debug('PreguntaService - crearUno: Ocurrio un error al tratar de borrar la pregunta');
                    logger.info('< Termina servicio crearUno');
                    return 'Error';
                }
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

    // Leer una pregunta y sus respuestas
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

            // Llamar al dto RespuestaDto.leerTodosConFiltro
            logger.debug('PreguntaService - leerUno: Realizando lectura de las respuestas de una pregunta');
            const respuestasEncontradas = await RespuestaDto.leerTodosConFiltro({ idPregunta: preguntaEncontrada._id })

            // Validar que no haya sucedido un error en el dto
            if(respuestasEncontradas === 'Error'){
                logger.debug('PreguntaService - leerUno: Ocurrio un error al tratar de leer las respuestas de una pregunta');
                logger.info('< Termina servicio leerUno');
                return 'Error';
            }

            // Validar que existan las respuestas
            if(respuestasEncontradas.length === 0){
                logger.debug('PreguntaService - leerUno: No existe ninguna respuesta de esa pregunta con ese id');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            // Agregar las respuestas encontradas a la pregunta
            Object.assign(preguntaEncontrada, { respuestas: respuestasEncontradas });

            logger.info('< Termina servicio leerUno');
            return preguntaEncontrada;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return 'Error';

        }
    },

    // Leer todas las preguntas
    leerTodos: async (req) => {

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

            logger.info('< Termina servicio leerTodos');
            return preguntasEncontradas;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return 'Error';

        }
    },

    // Leer todas las preguntas con sus respuestas
    leerTodosConRespuestas: async (req) => {

        try {
            logger.info('> Inicia servicio leerTodosConRespuestas');

            // Llamar al dto PreguntaDto.leerTodosConFiltro
            logger.debug('PreguntaService - leerTodosConRespuestas: Realizando lectura de todas las preguntas de un cuestionario');
            const preguntasEncontradas = await PreguntaDto.leerTodosConFiltro({ idCuestionario: req });

            // Validar que no haya sucedido un error en el dto
            if(preguntasEncontradas === 'Error'){
                logger.debug('PreguntaService - leerTodosConRespuestas: Ocurrio un error al tratar de leer todas las preguntas de un cuestionario');
                logger.info('< Termina servicio leerTodosConRespuestas');
                return 'Error';
            }

            // Validar que exista al menos una pregunta
            if(preguntasEncontradas.length === 0){
                logger.debug('PreguntaService - leerTodosConRespuestas: No existe ninguna pregunta de ese cuestionario');
                logger.info('< Termina servicio leerTodosConRespuestas');
                return false;
            }

            // Crear arreglo que contendra todas las preguntas con sus respuestas
            const preguntasRespuestas = [];

            for (const pregunta in preguntasEncontradas) {
                // Llamar al dto RespuestaDto.leerTodosConFiltro
                logger.debug('PreguntaService - leerTodosConRespuestas: Realizando lectura de las respuestas de una pregunta');
                const respuestasEncontradas = await RespuestaDto.leerTodosConFiltro({ idPregunta: pregunta._id });

                // Validar que no haya sucedido un error en el dto
                if(respuestasEncontradas === 'Error'){
                    logger.debug('PreguntaService - leerTodosConRespuestas: Ocurrio un error al tratar de leer las respuestas de una pregunta');
                    logger.info('< Termina servicio leerTodosConRespuestas');
                    return 'Error';
                }

                // Validar que existan las respuestas
                if(respuestasEncontradas.length === 0){
                    logger.debug('PreguntaService - leerTodosConRespuestas: No existe ninguna respuesta de esa pregunta con ese id');
                    logger.info('< Termina servicio leerTodosConRespuestas');
                    return false;
                }

                // Agregar las respuestas encontradas a la pregunta
                preguntasRespuestas.push(Object.assign(pregunta, { respuestas: respuestasEncontradas }));
            }

            logger.info('< Termina servicio leerTodosConRespuestas');
            return preguntasRespuestas;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodosConRespuestas: ', error);
            return 'Error';

        }
    },

    // Actualizar una pregunta y sus respuestas
    actualizarUno: async (idPregunta, pregunta, respuestas) => {

        try {
            logger.info('> Inicia servicio actualizarUno');

            // Llamar al dto PreguntaDto.updateOne
            logger.debug('PreguntaService - actualizarUno: Realizando actualización de una respuesta');
            const preguntaActualizada = await PreguntaDto.updateOne({ _id: idPregunta }, pregunta);

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

            for (const respuesta in respuestas) {
                // Llamar al dto PreguntaDto.updateOne
                logger.debug('PreguntaService - actualizarUno: Realizando actualización de una respuesta');
                const respuestaActualizada = await RespuestaDto.updateOne({ _id: respuesta._id }, respuesta);

                // Validar que no haya sucedido un error en el dto
                if(respuestaActualizada === 'Error'){
                    logger.debug('PreguntaService - actualizarUno: Ocurrio un error al tratar de actualizar una respuesta');
                    logger.info('< Termina servicio actualizarUno');
                    return 'Error';
                }

                // Validar que exista la respuesta
                if(respuestaActualizada == null){
                    logger.debug('PreguntaService - actualizarUno: No existe ninguna respuesta con ese id');
                    logger.info('< Termina servicio actualizarUno');
                    return false;
                }
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