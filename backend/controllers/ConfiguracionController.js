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
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio ConfiguracionService.leerTodos');
            const configuraciones = await ConfiguracionService.leerTodos(res);

            // Si regresa 'Error', significa que hubo un error en el servicio
            if(configuraciones === 'Error') {
                logger.debug('ConfiguracionController - crearUno: Ocurrio un error en el servicio ConfiguracionService.leerTodos');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio ConfiguracionService.leerTodos', 500), res, 500);
            }

            // Si regresa false, significa que ya existe un configuración previa
            if(!configuraciones) {
                logger.debug('ConfiguracionController - crearUno: Ya existe una configuracion, no se puede seguir con el proceso');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ya existe una configuracion, no se puede seguir con el proceso', 400), res, 400);
            }

            // Crear la configuración
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio ConfiguracionService.crearUno');
            const configuracionCreada = await ConfiguracionService.crearUno(res);

            // Si regresa false, significa que hubo un error en el servicio ConfiguracionService.crearUno
            if(configuracionCreada === 'Error') {
                logger.debug('ConfiguracionController - crearUno: Ocurrio un error en el servicio ConfiguracionService.crearUno');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio ConfiguracionService.crearUno', 500), res, 500);
            }

            // Crear licenciaturas
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio LicenciaturaService.creacionMasiva');
            const licenciaturasCreadas = await LicenciaturaService.creacionMasiva(licenciaturas);

            // Si regresa false, significa que hubo un error en el servicio LicenciaturaService.creacionMasiva
            if(licenciaturasCreadas === 'Error') {
                logger.debug('ConfiguracionController - crearUno: Ocurrio un error en el servicio LicenciaturaService.creacionMasiva');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio LicenciaturaService.creacionMasiva', 500), res, 500);
            }

            // Crear semestres
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio SemestreService.creacionMasiva');
            const semestresCreados = await SemestreService.creacionMasiva(semestres);

            // Si regresa false, significa que hubo un error en el servicio SemestreService.creacionMasiva
            if(semestresCreados === 'Error') {
                logger.debug('ConfiguracionController - crearUno: Ocurrio un error en el servicio SemestreService.creacionMasiva');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio SemestreService.creacionMasiva', 500), res, 500);
            }

            // Crear asignaturas
            logger.debug('ConfiguracionController - crearUno: Mandar a llamar al servicio AsignaturaService.creacionMasiva');
            const asignaturasCreadas = await AsignaturaService.creacionMasiva(asignaturas);

            // Si regresa false, significa que hubo un error en el servicio AsignaturaService.creacionMasiva
            if(asignaturasCreadas === 'Error') {
                logger.debug('ConfiguracionController - crearUno: Ocurrio un error en el servicio AsignaturaService.creacionMasiva');
                logger.info('<< Termina controller crearUno');
                return handler(Message('Ocurrio un error en el servicio AsignaturaService.creacionMasiva', 500), res, 500);
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