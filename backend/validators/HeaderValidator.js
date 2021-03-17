const logger = require('log4js').getLogger('HeaderValidator');
const { celebrate, Joi, Segments } = require('celebrate');
const { esNuloIndefinido } = require('../utils');
const { buscarUno } = require('./BusquedaValidator');

module.exports = {
    general: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            idusuario: Joi.string().required(),
            authorization: Joi.string().regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required(),
            accept: Joi.string(),
            'content-type': Joi.string(),
            'content-length': Joi.string(),
            validarborrado: Joi.boolean(),
            host: Joi.string(),
            'user-agent': Joi.string(),
            '$wscs': Joi.string(),
            '$wsis': Joi.string(),
            '$wsra': Joi.string(),
            '$wsrp': Joi.string(),
            '$wssn': Joi.string(),
            '$wsru': Joi.string(),
            '$wsrh': Joi.string(),
            '$wspr': Joi.string(),
            '$wssc': Joi.string(),
            '$wscc': Joi.string(),
            '$wsat': Joi.string(),
            '$wssi': Joi.string(),
            '$wssp': Joi.string(),
            b3: Joi.string(),
            'cache-control': Joi.string(),
            via: Joi.string(),
            'x-b3-spanid': Joi.string(),
            'x-b3-traceid': Joi.string(),
            'x-cf-applicationid': Joi.string(),
            'x-cf-instanceid': Joi.string(),
            'x-cf-instanceindex': Joi.string(),
            'x-client-ip': Joi.string(),
            'x-forwarded-for': Joi.string(),
            'x-forwarded-proto': Joi.string(),
            'x-global-transaction-id': Joi.string(),
            'x-request-start': Joi.string(),
            'x-vcap-request-id': Joi.string()
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