const logger = require('log4js').getLogger('FCAController');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { LicenciaturaService, SemestreService, AsignaturaService } = require('../services');

module.exports = {

    // leer las asignaturas por semestre y licenciatura
    leerTodasAsignaturasFiltro: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerTodasAsignaturasFiltro');
            logger.debug('Req Query: ', req.query);

            // Validar que vengan los parametros de busqueda
            if(req.query.claveLicenciatura == null){
                logger.debug('FCAController - leerTodasAsignaturasFiltro: No viene el parametro claveLicenciatura');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('No viene el parametro claveLicenciatura', 400), res, 400);
            }

            if(req.query.claveSemestre == null){
                logger.debug('FCAController - leerTodasAsignaturasFiltro: No viene el parametro claveSemestre');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('No viene el parametro claveSemestre', 400), res, 400);
            }

            // Validar que existan los parametros de busqueda
            const licenciaturaEncontrada = await LicenciaturaService.leerUno({clave: req.query.claveLicenciatura});
            logger.debug('licenciaturaEncontrada: ', licenciaturaEncontrada);
            if(!licenciaturaEncontrada){
                logger.debug('FCAController - leerTodasAsignaturasFiltro: La Asignatura no existe');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('La Asignatura no existe', 404), res, 404);
            }

            const semestreEncontrado = await SemestreService.leerUno({clave: req.query.claveSemestre});
            logger.debug('semestreEncontrado: ', semestreEncontrado);
            if(!semestreEncontrado){
                logger.debug('FCAController - leerTodasAsignaturasFiltro: El Semestre no existe');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('El Semestre no existe', 404), res, 404);
            }

            const filtro = {
                claveLicenciatura: req.query.claveLicenciatura,
                claveSemestre: req.query.claveSemestre,
            }

            // Llamar al servicio AsignaturaService.leerMuchasLicenciaturasPorFiltro
            logger.debug('FCAController - leerTodasAsignaturasFiltro: Mandar a llamar al servicio leerMuchasLicenciaturasPorFiltro de Asignatura');
            const asignaturas = await AsignaturaService.leerMuchasAsignaturasPorFiltro(filtro);
            logger.debug('asignaturas: ', asignaturas);

            // Si regresa 'Error', significa que ocurrio un error en el servicio
            if(asignaturas == 'Error') {
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('Ocurrio un error en el servicio AsignaturaService', 500), res, 500);
            }

            // Si regresa false, significa que no existe ninguna asignatura
            if(!asignaturas) {
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('No existe ninguna asignatura', 204), res, 204);
            }

            logger.info('<< Termina controller leerTodasAsignaturasFiltro');
            return handler(Message(asignaturas, 200), res, 200);

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerTodasAsignaturasFiltro: ', error);
            return handler(Message('Ocurrio un error en el controller leerTodasAsignaturasFiltro', 500), res, 500);

        }
    },

    // leer todas las licenciaturas o semestres
    leerTodasLicenciaturasOSemestres: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerTodasLicenciaturasOSemestres');
            logger.debug('Req Query: ', req.query);

            // Validar que vengan los parametros de busqueda
            if(req.query.fuente == null){
                logger.debug('FCAController - leerTodasLicenciaturasOSemestres: No viene el parametro fuente');
                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message('No viene el parametro fuente', 400), res, 400);
            }

            // Revisar por quien se hara la busqueda
            if(req.query.fuente == 'Licenciatura'){
                const licenciaturasEncontradas = await LicenciaturaService.leerTodos();

                if(!licenciaturasEncontradas){
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Ocurrio un error en el servicio LicenciaturaService');
                    logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                    return handler(Message('Ocurrio un error en el servicio LicenciaturaService', 500), res, 500);
                }

                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message(licenciaturasEncontradas, 200), res, 200);
            } 

            else if (req.query.fuente == 'Semestre'){
                const semestresEncontrados = await SemestreService.leerTodos();

                if(!semestresEncontrados){
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Ocurrio un error en el servicio SemestreService');
                    logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                    return handler(Message('Ocurrio un error en el servicio SemestreService', 500), res, 500);
                }

                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message(semestresEncontrados, 200), res, 200);
            }

            else {
                // No existe el parametro de busqueda que se esta mandando
                logger.debug('FCAController - leerTodasLicenciaturasOSemestres: La fuente de busqueda no esta permitida');
                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message('La fuente de busqueda no esta permitida', 400), res, 400);
            }

        } catch (error) {
            
            // Si existe un error en la lectura, devolver el error
            logger.error('Error en controller leerTodasLicenciaturasOSemestres: ', error);
            return handler(Message('Ocurrio un error en el controller leerTodasAsignaturasFiltro', 500), res, 500);

        }
    },

};