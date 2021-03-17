const logger = require('log4js').getLogger('HistorialService');
const { HistorialDto } = require('../dtos');

module.exports = {

    // Crear un historial (realizar un cuestionario)
    crearUno: async (req) => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Llamar al dto HistorialDto.crearUno
            logger.debug('HistorialService - crearUno: Realizando creación de un historial');
            const historialCreado = await HistorialDto.crearUno(req);

            // Validar que no haya sucedido un error en el dto
            if(historialCreado == null){
                logger.debug('HistorialService - crearUno: Ocurrio un error al tratar de crear el historial');
                logger.info('< Termina servicio crearUno');
                return 'Error';
            }

            logger.debug('HistorialService - crearUno: Se realizo exitosamente la creacion del historial');
            logger.info('< Termina servicio crearUno');
            return historialCreado;

        } catch (error) {

            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio crearUno: ', error);
            return 'Error';

        }
    },

    // Leer un historial
    leerUno: async (filtro) => {

        try {
            logger.info('> Inicia servicio leerUno');

            // Llamar al dto PreguntaDto.leerUno
            logger.debug('HistorialService - leerUno: Realizando lectura de un historial');
            const historialEncontrado = await HistorialDto.leerUno(filtro);

            // Validar que no haya sucedido un error en el dto
            if(historialEncontrado === 'Error'){
                logger.debug('HistorialService - leerUno: Ocurrio un error al tratar de leer un historial');
                logger.info('< Termina servicio leerUno');
                return 'Error';
            }

            // Validar que exista el historial
            if(historialEncontrado == null){
                logger.debug('HistorialService - leerUno: No existe ningun historial con esas condiciones');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return historialEncontrado;

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
            logger.debug('HistorialService - leerTodos: Realizando lectura de todos los historiales');
            const historialesEncontrados = await HistorialDto.leerTodosConFiltro(req);

            // Validar que no haya sucedido un error en el dto
            if(historialesEncontrados === 'Error'){
                logger.debug('HistorialService - leerTodos: Ocurrio un error al tratar de leer todos los historiales');
                logger.info('< Termina servicio leerTodos');
                return 'Error';
            }

            // Validar que exista al menos una pregunta
            if(historialesEncontrados.length === 0){
                logger.debug('HistorialService - leerTodos: No existe ningun historial');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return historialesEncontrados;

        } catch (error) {

            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return 'Error';

        }
    },

};