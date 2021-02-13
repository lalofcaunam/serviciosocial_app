const logger = require('log4js').getLogger('AsignaturaService');
const { FcaDto } = require('../dtos');
const { Asignatura } = require('../models')

module.exports = {

    // Crear muchas asignaturas
    creacionMasiva: async (req) => {

        try {
            logger.info('> Inicia servicio creacionMasiva');

            // Llamar al dto FcaDto.creacionMasiva
            logger.debug('AsignaturaService - creacionMasiva: Realizando creación masiva de asignaturas');
            const asignaturasCreadas = await FcaDto.creacionMasiva(req, Asignatura);

            // Validar que no haya sucedido un error en el dto
            if(asignaturasCreadas == null){
                logger.debug('AsignaturaService - creacionMasiva: Ocurrio un error al tratar de crear las asignaturas');
                logger.info('< Termina servicio creacionMasiva');
                return 'Error';
            }

            logger.debug('AsignaturaService - crearUno: Se realizo exitosamente la creacion de las asignaturas');
            logger.info('< Termina servicio creacionMasiva');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio creacionMasiva: ', error);
            return 'Error';

        }
    },

    // Leer todas las asignaturas
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            // Llamar al dto FcaDto.leerTodos
            logger.debug('AsignaturaService - leerTodos: Realizando lectura de todas las asignaturas');
            const asignaturasEncontradas = await FcaDto.leerTodos(Asignatura);

            // Validar que no haya sucedido un error en el dto
            if(asignaturasEncontradas == 'Error'){
                logger.debug('AsignaturaService - leerTodos: Ocurrio un error al tratar de leer las asignaturas');
                logger.info('< Termina servicio leerTodos');
                return 'Error';
            }

            // Validar que exista al menos una asignatura
            if(asignaturasEncontradas.length == 0){
                logger.debug('AsignaturaService - leerTodos: No existe ninguna asignatura');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return asignaturasEncontradas;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return 'Error';

        }
    },

    // Leer una asignatura
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            // Llamar al dto FcaDto.leerUno
            logger.debug('AsignaturaService - leerUno: Realizando lectura de una asignatura');
            const asignaturaEncontrada = await FcaDto.leerUno(req, Asignatura);

            // Validar que no haya sucedido un error en el dto
            if(asignaturaEncontrada == null){
                logger.debug('AsignaturaService - leerUno: Ocurrio un error al tratar de leer una asignatura');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return asignaturaEncontrada;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return false;

        }
    },

    // Leer las asignaturas por clave de semestre y licenciatura
    leerMuchasLicenciaturasPorFiltro: async (req) => {

        try {
            logger.info('> Inicia servicio leerMuchasLicenciaturasPorFiltro');

            // Llamar al dto FcaDto.leerMuchosPorFiltro
            logger.debug('AsignaturaService - leerMuchasLicenciaturasPorFiltro: Realizando lectura de las asignaturas');
            const asignaturasEncontradas = await FcaDto.leerMuchosPorFiltro(req, Asignatura);

            // Validar que no haya sucedido un error en el dto
            if(asignaturasEncontradas == null){
                logger.debug('AsignaturaService - leerMuchasLicenciaturasPorFiltro: Ocurrio un error al tratar de leer las asignatura');
                logger.info('< Termina servicio leerMuchasLicenciaturasPorFiltro');
                return false;
            }

            logger.info('< Termina servicio leerMuchasLicenciaturasPorFiltro');
            return asignaturasEncontradas;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerMuchasLicenciaturasPorFiltro: ', error);
            return false;

        }
    },

};