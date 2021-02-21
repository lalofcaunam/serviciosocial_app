const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    crearUno: celebrate({
        [Segments.BODY]: Joi.object().keys({
            nombre: Joi.string().required(),
            tema: Joi.string().required(),
            claveAsignatura: Joi.string(),
            claveLicenciatura: Joi.string().required(),
            claveSemestre: Joi.string().required(),
            tiempo: Joi.string(),
        }),
    }),
}
