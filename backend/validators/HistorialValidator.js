const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    crearUno: celebrate({
        [Segments.BODY]: Joi.object().keys({
            respuestas: Joi.array().items(Joi.object().keys({
                pregunta: Joi.string().required(),
                respuesta: Joi.object().keys({
                    esCorrecta: Joi.boolean().required(),
                    texto: Joi.string().required(),
                    comentario: Joi.string().required(),
                }).required(),
            })).min(1),
        }),
    })
}