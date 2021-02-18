const logger = require('log4js').getLogger('GeneralValidator');
const { handler } = require('../utils');
const { Message } = require('../enum');

module.exports = {
    esNullUndefined: ([valores], [parametro], origen, res) => {
        try {
            const valoresNulosIndefinidos = [];

            // Si el valor es nulo o indefinido, agregar al arreglo de valores nulos o indefinidos
            valores.filter((valor, index) => {
                if(valor == null || valor == undefined){
                    valoresNulosIndefinidos.push({parametro: parametro[index], valor: valor});
                }
            });

            // Si el arreglo de nulos o indefinidos al menos tiene un valor, regresar el error
            if(valoresNulosIndefinidos.length != 0){
                logger.debug(`Los siguientes parametros son nulos o indefinidos: ${valoresNulosIndefinidos}`);
                logger.info(`<< Termina controller ${origen}`);
                return handler(Message(`Los siguientes parametros son nulos o indefinidos: ${valoresNulosIndefinidos}`, 400), res, 400);
            }

        } catch (error) {
            // Si existe un error , devolver el error
            logger.error('Error en el validador esNullUndefined: ', error);
            logger.info(`<< Termina controller ${origen}`);
            return handler(Message('Ocurrio un error en el validador esNullUndefined', 500), res, 500);
        }
    },
};