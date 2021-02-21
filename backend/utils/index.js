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
    crearToken: (payload, tiempoExpiracion) => {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tiempoExpiracion });
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
    esNuloIndefinido: (valores, parametro) => {
        try {
            const valoresNulosIndefinidos = [];

            // Si el valor es nulo o indefinido, agregar al arreglo de valores nulos o indefinidos
            valores.filter((valor, index) => {
                if(valor == null) valoresNulosIndefinidos.push({parametro: parametro[index], valor: valor});
            });

            // Si el arreglo de nulos o indefinidos al menos tiene un valor, regresar el error
            if(valoresNulosIndefinidos.length !== 0){
                logger.debug(`Los siguientes parametros son nulos o indefinidos: ${valoresNulosIndefinidos}`);
                return { error: true, message: `Los siguientes parametros son nulos o indefinidos: ${valoresNulosIndefinidos}`, code: 400 };
            }

            return true;

        } catch (error) {
            // Si existe un error , devolver el error
            logger.error('Error en en la utilidad esNullUndefined: ', error);
            return { error: true, message: `Ocurrio un error en la utilidad esNullUndefined`, code: 500 };
        }
    },
};