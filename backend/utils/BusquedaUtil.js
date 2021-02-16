const logger = require('log4js').getLogger('BusquedaUtil');
const { handler } = require('../utils');
const { Message } = require('../enum');
const { 
    LicenciaturaService,
    SemestreService,
    AsignaturaService,
    CuestionarioService,
 } = require('../services');


const validarModelo = async (modelo, id) => {
    let consulta = 0;
    switch (modelo) {
        case 'Licenciatura':
            consulta = await LicenciaturaService.leerUno({clave: id});
            logger.debug('licenciaturaEncontrada: ', consulta);
            return consulta;

        case 'Semestre':
            consulta = await SemestreService.leerUno({clave: id});
            logger.debug('semestreEncontrado: ', consulta);
            return consulta;
        
        case 'Asignatura':
            consulta = await AsignaturaService.leerUno({clave: id});
            logger.debug('asignaturaEncontrada: ', consulta);
            return consulta;
        
        case 'Cuestionario':
            consulta = await CuestionarioService.leerUno(id);
            logger.debug('cuestionarioEncontrado: ', consulta);
            return consulta;
    
        default:
            break;
    }
}

module.exports = {
    buscarUno: async (modelo, id, origen) => {
        try {

            // llamar a la funcion validarModelo, (esta consultara dependiendo el tipo de modelo) y regresara el objeto, false o 'Error'
            const consulta = await validarModelo(modelo, id);

            // Validar que se realizo alguna operación
            if ( consulta == 0){
                logger.debug(`No existe el modelo ${modelo}`);
                logger.info(`<< Termina controller ${origen}`);
                return handler(Message(`No existe el modelo ${modelo}`, 500), res, 500);
            }

            // Validar que no hubo errores en la consulta
            if ( consulta == 'Error'){
                logger.debug(`Hubo un error al consultar el servicio leerUno de ${modelo}`);
                logger.info(`<< Termina controller ${origen}`);
                return handler(Message(`Hubo un error al consultar el servicio leerUno de ${modelo}`, 500), res, 500);
            }

            // Validar que exista el valor mandado a buscar
            if ( consulta == null){
                logger.debug(`No existe ningun elemento de ${modelo}`);
                logger.info(`<< Termina controller ${origen}`);
                return handler(Message(`No existe ningun elemento de ${modelo}`, 204), res, 204);
            }

            logger.debug(`Objeto encontrado ${consulta}`);
            return consulta;

        } catch (error) {
            // Si existe un error , devolver el error
            logger.error('Error en la utilidad buscarUno: ', error);
            logger.info(`<< Termina controller ${origen}`);
            return handler(Message('Ocurrio un error en la utilidad buscarUno', 500), res, 500);
        }
    },
};