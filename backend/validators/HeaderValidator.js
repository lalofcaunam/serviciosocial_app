const logger = require('log4js').getLogger('HeaderValidator');
const { celebrate, Joi, Segments } = require('celebrate');
const { esNuloIndefinido } = require('../utils');
const { buscarUno } = require('./BusquedaValidator');

module.exports = {
    general: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            idusuario: Joi.string().required(),
            authorization: Joi.string().regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required(),
            accept: Joi.string().required(),
            'content-type': Joi.string(),
            'content-length': Joi.string(),
        }),
    }),
    idUsuario: async (rol, req) => {
        try {

            // Validar que no venga nulo el header
            const headerNuloIndefinido = esNuloIndefinido([req.headers.idusuario], ['HeaderIdUsuario']);
            if(headerNuloIndefinido.error){
                return { error: headerNuloIndefinido.error, message: headerNuloIndefinido.message, code: headerNuloIndefinido.code };
            }

            // Validar que exista el usuario
            const usuarioEncontrado = await buscarUno('Usuario', req.headers.idusuario);
            if(usuarioEncontrado.error){
                return { error: usuarioEncontrado.error, message: usuarioEncontrado.message, code: 400 };
            }

            // Si el rol es diferente de nulo
            if(rol != null){
                // Validar el rol del usuario
                if(usuarioEncontrado.rol !== rol){
                    logger.error(`El usuario no tiene el rol de ${rol}`);
                    return { error: true, message: `El usuario no tiene el rol de ${rol}`, code: 401 };
                }
            }

            return usuarioEncontrado;

        } catch (error) {
            logger.error('Error en validador idUsuario: ', error);
            return { error: true, message: `Error en validador idUsuario`, code: 500 };
        }
    },
}