const logger = require('log4js').getLogger('LicenciaturaService');
const { FcaDto } = require('../dtos');
const { Licenciatura } = require('../models')

module.exports = {

    // Crear muchas licenciaturas
    creacionMasiva: async (req) => {

        try {
            logger.info('> Inicia servicio creacionMasiva');

            logger.debug('LicenciaturaService - creacionMasiva: Realizando creación masiva de licenciatura');
            const licenciaturasCreadas = await FcaDto.creacionMasiva(req, Licenciatura);

            if(licenciaturasCreadas == null){
                logger.debug('LicenciaturaService - creacionMasiva: Ocurrio un error al tratar de crear las licenciaturas');
                logger.info('< Termina servicio creacionMasiva');
                return false;
            }

            logger.debug('LicenciaturaService - crearUno: Se realizo exitosamente la creacion de las licenciaturas');
            logger.info('< Termina servicio creacionMasiva');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio creacionMasiva: ', error);
            return false;

        }
    },

    // Leer todas las licenciaturas
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            logger.debug('LicenciaturaService - leerTodos: Realizando lectura de todas las licenciaturas');
            const licenciaturasEncontradas = await FcaDto.leerTodos(Licenciatura);

            if(licenciaturasEncontradas == null){
                logger.debug('LicenciaturaService - creacionMasiva: Ocurrio un error al tratar de leer las licenciaturas');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return licenciaturasEncontradas;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return false;

        }
    },

    // Leer una licenciatura
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            logger.debug('LicenciaturaService - leerUno: Realizando lectura de una licenciatura');
            const licenciaturaEncontrada = await FcaDto.leerUno(req, Licenciatura);

            if(licenciaturaEncontrada == null){
                logger.debug('LicenciaturaService - leerUno: Ocurrio un error al tratar de leer una licenciatura');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return licenciaturaEncontrada;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return false;

        }
    },

};