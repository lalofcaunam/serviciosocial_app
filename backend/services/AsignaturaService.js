const logger = require('log4js').getLogger('AsignaturaService');
const { FcaDto } = require('../dtos');
const { Asignatura } = require('../models')

module.exports = {

    // Crear muchas asignaturas
    creacionMasiva: async (req) => {

        try {
            logger.info('> Inicia servicio creacionMasiva');

            logger.debug('AsignaturaService - creacionMasiva: Realizando creación masiva de asignaturas');
            const asignaturasCreadas = await FcaDto.creacionMasiva(req, Asignatura);

            if(asignaturasCreadas == null){
                logger.debug('AsignaturaService - creacionMasiva: Ocurrio un error al tratar de crear las asignaturas');
                logger.info('< Termina servicio creacionMasiva');
                return false;
            }

            logger.debug('AsignaturaService - crearUno: Se realizo exitosamente la creacion de las asignaturas');
            logger.info('< Termina servicio creacionMasiva');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio creacionMasiva: ', error);
            return false;

        }
    },

    // Leer todas las asignaturas
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            logger.debug('AsignaturaService - leerTodos: Realizando lectura de todas las asignaturas');
            const asignaturasEncontradas = await FcaDto.leerTodos(Asignatura);

            if(asignaturasEncontradas == null){
                logger.debug('AsignaturaService - creacionMasiva: Ocurrio un error al tratar de leer las asignaturas');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return asignaturasEncontradas;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return false;

        }
    },

    // Leer una asignatura
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            logger.debug('AsignaturaService - leerUno: Realizando lectura de una asignatura');
            const asignaturaEncontrada = await FcaDto.leerUno(req, Asignatura);

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

            logger.debug('AsignaturaService - leerMuchasLicenciaturasPorFiltro: Realizando lectura de las asignaturas');
            const asignaturasEncontradas = await FcaDto.leerMuchosPorFiltro(req, Asignatura);

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