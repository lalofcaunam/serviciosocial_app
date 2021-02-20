const logger = require('log4js').getLogger('ConfiguracionService');
const { ConfiguracionDto } = require('../dtos');
const moment = require('moment-business-days');

module.exports = {

    // Crear una configuracion
    crearUno: async () => {

        try {
            logger.info('> Inicia servicio crearUno');

            // Inicializar timestamp
            const configuracion = {
                fechaCreacion: moment().format('L')
            }

            // Llamar al dto ConfiguracionDTO.crearUno
            logger.debug('ConfiguracionService - crearUno: Realizando creación de configuración');
            const configuracionCreada = await ConfiguracionDto.crearUno(configuracion);

            // Validar que no haya sucedido un error en el dto
            if(configuracionCreada === 'Error'){
                logger.debug('ConfiguracionService - crearUno: Ocurrio un error al tratar de crear la configuracion');
                logger.info('< Termina servicio createOne');
                return 'Error';
            }

            logger.debug('ConfiguracionService - crearUno: Se realizo exitosamente la creacion de la configuracion');
            logger.info('< Termina servicio crearUno');
            return true;

        } catch (error) {

            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller createOne: ', error);
            return 'Error';

        }
    },

    // Leer todas las configuraciones
    leerTodos: async () => {

        try {
            logger.info('> Inicia servicio leerTodos');

            // Llamar al dto ConfiguracionDTO.leerTodos
            logger.debug('ConfiguracionService - leerTodos: Realizando consulta de todas las configuraciones');
            const configuraciones = await ConfiguracionDto.leerTodos();

            // Validar que no haya sucedido un error en el dto
            if(configuraciones === 'Error'){
                logger.debug('ConfiguracionService - leerTodos: Ocurrio un error en el servicio leerTodos');
                logger.info('< Termina servicio leerTodos');
                return 'Error';
            }

            // Validar que no haya sucedido un error en el dto
            if(configuraciones.length !== 0){
                logger.debug('ConfiguracionService - leerTodos: Ya existe una configuracion, no se puede seguir con el proceso');
                logger.info('< Termina servicio leerTodos');
                return false;
            }

            logger.info('< Termina servicio leerTodos');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('ConfiguracionService - leerTodos: Ocurrio un error ', error);
            return 'Error';

        }
    },

};