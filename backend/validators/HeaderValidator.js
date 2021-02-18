const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    general: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            idusuario: Joi.string().required(),
            authorization: Joi.string().regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required(),
            accept: Joi.string().required(),
        }),
    }),
}