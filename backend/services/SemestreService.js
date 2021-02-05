const logger = require('log4js').getLogger('SemestreService');
const { FcaDto } = require('../dtos');
const { Semestre } = require('../models')

module.exports = {

    // Crear muchos semestres
    creacionMasiva: async (req) => {

        try {
            logger.info('> Inicia servicio creacionMasiva');

            logger.debug('SemestreService - creacionMasiva: Realizando creación masiva de semestre');
            const semestresCreados = await FcaDto.creacionMasiva(req, Semestre);

            if(semestresCreados == null){
                logger.debug('SemestreService - creacionMasiva: Ocurrio un error al tratar de crear los semestres');
                logger.info('< Termina servicio creacionMasiva');
                return false;
            }

            logger.debug('SemestreService - crearUno: Se realizo exitosamente la creacion de los semestres');
            logger.info('< Termina servicio creacionMasiva');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en servicio creacionMasiva: ', error);
            return false;

        }
    },

    // Leer todas los semestres
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            logger.debug('SemestreService - leerTodos: Realizando lectura de todas los semestres');
            const semestresEncontrados = await FcaDto.leerTodos(Semestre);

            if(semestresEncontrados == null){
                logger.debug('SemestreService - creacionMasiva: Ocurrio un error al tratar de leer los semestres');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return semestresEncontrados;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerTodos: ', error);
            return false;

        }
    },

    // Leer un semestre
    leerUno: async (req) => {

        try {
            logger.info('> Inicia servicio leerUno');

            logger.debug('SemestreService - leerUno: Realizando lectura de un semestre');
            const semestreEncontrado = await FcaDto.leerUno(req, Semestre);

            if(semestreEncontrado == null){
                logger.debug('SemestreService - leerUno: Ocurrio un error al tratar de leer un semestre');
                logger.info('< Termina servicio leerUno');
                return false;
            }

            logger.info('< Termina servicio leerUno');
            return semestreEncontrado;

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en servicio leerUno: ', error);
            return false;

        }
    },

};