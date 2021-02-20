const logger = require('log4js').getLogger('index');
const { Codigo } = require('../enum');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.APIKEY_SENDGRID);

module.exports = {
    handler: (doc, res, code) => {
        res.status(code).json(Object.assign(Codigo[code], doc));
    },
    compararContrasenias: (userPassword, reqPassword) => {
        return bcrypt.compare(reqPassword, userPassword);
    },
    crearToken: (usuario) => {
        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
            correoActivado: usuario.emailActivado,
        };

        try {
            return jwt.sign(payload, process.env.JWT_SECRET);
        } catch (error) {
            return undefined;
        }
    },
    enviarCorreo: async (usuario) => {

        const url = `${process.env.PROTOCOL}://${process.env.HOSTNAME}:${process.env.PORT}/ssfca/api/v1/usuarios/${usuario._id}/verificar`

        const msg = {
            to: usuario.correo,
            from: process.env.SENDER_SENDGRID,
            templateId: process.env.TEMPLATE_SENDGRID,
            dynamic_template_data: {
                urlVerificacion: url,
                nombreUsuario: usuario.nombre,
            }
        };

        return await sendgrid.send(msg, (error, result) => {
            if (error) {
                logger.error("Ocurrio un error al enviar el correo: ", error);
                return false;
            } else {
                logger.debug("¡Se envio el correo exitosamente!");
                logger.debug("Result: ", result);
                return true;
            }
        });
    },
};