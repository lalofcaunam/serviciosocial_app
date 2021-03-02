const logger = require('log4js').getLogger('BusquedaUtil');
const { 
    LicenciaturaService,
    SemestreService,
    AsignaturaService,
    UsuarioService,
    CuestionarioService,
    PreguntaService,
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

        case 'Usuario':
            consulta = await UsuarioService.leerUno(id);
            logger.debug('usuarioEncontrado: ', consulta);
            return consulta;
        
        case 'Cuestionario':
            consulta = await CuestionarioService.leerUno({_id: id});
            logger.debug('cuestionarioEncontrado: ', consulta);
            return consulta;

        case 'CuestionarioProfesor':
            consulta = await CuestionarioService.leerUno(id);
            logger.debug('cuestionarioEncontrado: ', consulta);
            return consulta;

        case 'Pregunta':
            consulta = await PreguntaService.leerUno(id);
            logger.debug('preguntaEncontrado: ', consulta);
            return consulta;
    
        default:
            break;
    }
}

module.exports = {
    buscarUno: async (modelo, id) => {
        try {

            // llamar a la funcion validarModelo, (esta consultara dependiendo el tipo de modelo) y regresara el objeto, false o 'Error'
            const consulta = await validarModelo(modelo, id);

            // Validar que exista el valor mandado a buscar
            if ( consulta === false){
                logger.debug(`No existe ningun elemento de ${modelo}`);
                return { error: true, message: `No existe ningun elemento de ${modelo}`, code: 404 };
            }

            // Validar que se realizo alguna operación
            if ( consulta === 0){
                logger.debug(`No existe el modelo ${modelo}`);
                return { error: true, message: `No existe el modelo ${modelo}`, code: 500 };
            }

            // Validar que no hubo errores en la consulta
            if ( consulta === 'Error'){
                logger.debug(`Hubo un error al consultar el servicio leerUno de ${modelo}`);
                return { error: true, message: `Hubo un error al consultar el servicio leerUno de ${modelo}`, code: 500 };
            }

            return consulta;

        } catch (error) {
            // Si existe un error , devolver el error
            logger.error('Error en la utilidad buscarUno: ', error);
            return { error: true, message: 'Ocurrio un error en la utilidad buscarUno', code: 500 };
        }
    },
};