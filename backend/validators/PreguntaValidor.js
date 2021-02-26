const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    crearUno: celebrate({
        [Segments.BODY]: Joi.object().keys({
            texto: Joi.string().required(),
            idCuestionario: Joi.string().required(),
            respuestas: Joi.array().items(Joi.object().keys({
                texto: Joi.string().required(),
                esCorrecta: Joi.boolean().required(),
                comentario: Joi.string().required(),
            })).min(4).max(4),
        }),
    }),
}