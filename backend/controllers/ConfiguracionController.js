const logger = require('log4js').getLogger('CompanyController');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { ConfiguracionService, LicenciaturaService, SemestreService, AsignaturaService } = require('../services');
const { licenciaturas } = require('../data/LicenciaturaData');
const { semestres } = require('../data/SemestreData');
const { asignaturas } = require('../data/AsignaturaData');

module.exports = {

    // Crear una configuracion
    crearUno: async (req, res) => {

        try {
            logger.info('>> Inicia controller crearUno');

            // Revisar si ya existe una configuración
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio leerUno de Configuracion');
            const configuraciones = await ConfiguracionService.leerTodos(res);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(configuraciones === 'Error') {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio leerTodos de Configuracion', 500), res, 500);
            }

            // Si regresa false, significa que ya existe un configuración previa
            if(!configuraciones) {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ya existe una configuracion, no se puede seguir con el proceso', 400), res, 400);
            }

            // Crear la configuración
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio crearUno de Configuracion');
            const configuracionCreada = await ConfiguracionService.crearUno(res);

            // Si regresa false, significa que hubo un error en el servicio ConfiguracionService.crearUno
            if(configuracionCreada === 'Error') {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error al tratar de crear la configuracion', 500), res, 500);
            }

            // Crear licenciaturas
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio creacionMasiva de Licenciatura');
            const licenciaturasCreadas = await LicenciaturaService.creacionMasiva(licenciaturas);

            // Si regresa false, significa que hubo un error en el servicio LicenciaturaService.creacionMasiva
            if(licenciaturasCreadas === 'Error') {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error al tratar de crear las licenciaturas', 500), res, 500);
            }

            // Crear semestres
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio creacionMasiva de Semestre');
            const semestresCreados = await SemestreService.creacionMasiva(semestres);

            // Si regresa false, significa que hubo un error en el servicio SemestreService.creacionMasiva
            if(semestresCreados === 'Error') {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error al tratar de crear los semestres', 500), res, 500);
            }

            // Crear asignaturas
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio creacionMasiva de Asignatura');
            const asignaturasCreadas = await AsignaturaService.creacionMasiva(asignaturas);

            // Si regresa false, significa que hubo un error en el servicio AsignaturaService.creacionMasiva
            if(asignaturasCreadas === 'Error') {
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error al tratar de crear las asignaturas', 500), res, 500);
            }

            logger.info('<< Termina controller crearUno');
            return handler(Message('ACK, la configuracion inicial se ha realizado con exito', 201), res, 201);

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller createOne: ', error);
            return handler(Message('Ocurrio un error en el controller crearUno', 500), res, 500);
        }
    },

};