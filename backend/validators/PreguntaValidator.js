const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    crearUno: celebrate({
        [Segments.BODY]: Joi.object().keys({
            texto: Joi.string().required(),
            respuestas: Joi.array().items(Joi.object().keys({
                texto: Joi.string().required(),
                esCorrecta: Joi.boolean().required(),
                comentario: Joi.string().required(),
            })).min(4).max(4),
        }),
    }),
    actualizarUno: celebrate({
        [Segments.BODY]: Joi.object().keys({
            texto: Joi.string(),
            respuestas: Joi.array().items(Joi.object().keys({
                _id: Joi.string(),
                texto: Joi.string(),
                esCorrecta: Joi.boolean(),
                comentario: Joi.string(),
            })).min(4).max(4),
        }),
    }),
}