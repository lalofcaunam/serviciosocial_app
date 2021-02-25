const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  signup: celebrate({
    [Segments.BODY]: Joi.object().keys({
      nombre: Joi.string().required(),
      apellidoPaterno: Joi.string().required(),
      apellidoMaterno: Joi.string(),
      correo: Joi.string().required(),
      contrasenia: Joi.string().required(),
      clave: Joi.string().required(),
      rol: Joi.string().required(),
    }),
  }),
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      correo: Joi.string().required(),
      contrasenia: Joi.string().required(),
    }),
  }),
  enviarCorreoReset: celebrate({
    [Segments.BODY]: Joi.object().keys({
      correo: Joi.string().required(),
    }),
  }),
  reset: celebrate({
    [Segments.BODY]: Joi.object().keys({
      contrasenia: Joi.string().required(),
    }),
  }),
}
