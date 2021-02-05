const logger = require('log4js').getLogger('CompanyController');
const { ConfiguracionDTO } = require('../dtos');

module.exports = {

    // Crear una configuracion
    crearUno: async (res) => {

        try {
            logger.info('> Inicia servicio crearUno');

            const timestamp = new Date().toISOString();
            const configuracion = {
                fechaCreacion: timestamp
            }

            logger.debug('ConfiguracionService - crearUno: Realizando creación de configuración');
            const configuracionCreada = await ConfiguracionDTO.crearUno(configuracion);

            if(configuracionCreada == null){
                logger.debug('ConfiguracionService - crearUno: Ocurrio un error al tratar de crear la configuracion');
                logger.info('< Termina servicio createOne');
                return false;
            }

            logger.debug('ConfiguracionService - crearUno: Se realizo exitosamente la creacion de la configuracion');

            logger.info('< Termina servicio crearUno');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('Error en controller createOne: ', error);
            return false;

        }
    },

    // Leer todas las configuraciones
    leerTodos: async (res) => {

        try {
            logger.info('> Inicia servicio leerTodos');

            logger.debug('ConfiguracionService - crearUno: Realizando consulta de todas las configuraciones');
            const configuraciones = await ConfiguracionDTO.leerTodos();

            if(configuraciones.length != 0){
                logger.debug('ConfiguracionService - leerTodos: Ya existe una configuracion, no se puede seguir con el proceso');
                logger.info('< Termina servicio createOne');
                return false;
            }

            logger.info('< Termina servicio createOne');
            return true;

        } catch (error) {
            
            // Si existe un error en la creación, devolver el error
            logger.error('ConfiguracionService - crearUno: Ocurrio un error ', error);
            return false;

        }
    },

};