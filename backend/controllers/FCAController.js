const logger = require('log4js').getLogger('FCAController');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { HeaderValidator } = require('../validators');
const { LicenciaturaService, SemestreService, AsignaturaService } = require('../services');

module.exports = {

    // leer las asignaturas por semestre y licenciatura
    leerTodasAsignaturasFiltro: async (req, res) => {

        try {
            logger.info('>> Inicia controller leerTodasAsignaturasFiltro');
            logger.debug('Req Query: ', req.query);

            // Validar rol del usuario
            logger.debug('FCAController - leerTodasAsignaturasFiltro: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('FCAController - leerTodasAsignaturasFiltro: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Llamar al servicio AsignaturaService.leerMuchasLicenciaturasPorFiltro
            logger.debug('FCAController - leerTodasAsignaturasFiltro: Mandar a llamar al servicio AsignaturaService.leerMuchasAsignaturasPorFiltro');
            const asignaturas = await AsignaturaService.leerMuchasAsignaturasPorFiltro({
                claveLicenciatura: req.query.claveLicenciatura,
                claveSemestre: req.query.claveSemestre,
            });

            // Si regresa 'Error', significa que ocurrio un error en el servicio
            if(asignaturas === 'Error') {
                logger.debug('FCAController - leerTodasAsignaturasFiltro: Ocurrio un error en el servicio AsignaturaService.leerMuchasAsignaturasPorFiltro');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('currio un error en el servicio AsignaturaService.leerMuchasAsignaturasPorFiltro', 500), res, 500);
            }

            // Si regresa false, significa que no existe ninguna asignatura
            if(!asignaturas) {
                logger.debug('FCAController - leerTodasAsignaturasFiltro: No existe ninguna asignatura');
                logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                return handler(Message('No existe ninguna asignatura', 404), res, 404);
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

            // Validar rol del usuario
            logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Mandar a llamar al validador HeaderValidator.idUsuario');
            const validarUsuario = await HeaderValidator.idUsuario('Profesor', req);
            if(validarUsuario.error) {
                logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Hubo un error en el validador HeaderValidator.idUsuario');
                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message(validarUsuario.message, validarUsuario.code), res, validarUsuario.code);
            }

            // Revisar por quien se hara la busqueda
            if(req.query.fuente === 'Licenciatura'){
                logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Mandar a llamar al servicio LicenciaturaService.leerTodos');
                const licenciaturasEncontradas = await LicenciaturaService.leerTodos();

                // Si regresa 'Error', significa que ocurrio un error en el servicio
                if(licenciaturasEncontradas === 'Error') {
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Ocurrio un error en el servicio LicenciaturaService.leerTodos');
                    logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                    return handler(Message('Ocurrio un error en el servicio LicenciaturaService.leerTodos', 500), res, 500);
                }

                if(!licenciaturasEncontradas){
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: No existe ninguna Licenciatura');
                    logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                    return handler(Message('No existe ninguna Licenciatura', 204), res, 204);
                }

                logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                return handler(Message(licenciaturasEncontradas, 200), res, 200);
            } 

            else if (req.query.fuente === 'Semestre'){
                logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Mandar a llamar al servicio SemestreService.leerTodos');
                const semestresEncontrados = await SemestreService.leerTodos();

                // Si regresa 'Error', significa que ocurrio un error en el servicio
                if(semestresEncontrados === 'Error') {
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: Ocurrio un error en el servicio SemestreService.leerTodos');
                    logger.info('<< Termina controller leerTodasAsignaturasFiltro');
                    return handler(Message('Ocurrio un error en el servicio SemestreService.leerTodos', 500), res, 500);
                }

                if(!semestresEncontrados){
                    logger.debug('FCAController - leerTodasLicenciaturasOSemestres: No existe ningun semestre');
                    logger.info('<< Termina controller leerTodasLicenciaturasOSemestres');
                    return handler(Message('No existe ningun semestre', 204), res, 204);
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