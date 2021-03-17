const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  leerTodasAsignaturasFiltro: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      claveLicenciatura: Joi.string().required(),
      claveSemestre: Joi.string().required(),
    }),
  }),
  leerTodasLicenciaturasOSemestres: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      fuente: Joi.string().required(),
    }),
  })
}
