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
            // Solo si regresa el objeto, retornar ese valor
            // De lo contrario, contestar desde aquí el error correspondiente

            const consulta = await validarModelo(modelo, id);

            // Validar que se realizo alguna operación
            if ( consulta == 0){
                // No existe el modelo por el cual se mando a buscar
            }

            // Validar que no hubo errores en la consulta
            if ( consulta == 'Error'){
                // ...
            }

            // Validar que exista el valor mandado a buscar
            if ( consulta == null){
                // ...
            }

            return consulta;

        } catch (error) {
            // Constestar el error correspodiente
        }
    },
};