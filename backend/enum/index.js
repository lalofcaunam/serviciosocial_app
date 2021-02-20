const Codigo = Object.freeze({
    200: {
        http: {
            code: 200,
            detail: "Ok",
        }
    },
    201: {
        http: {
            code: 201,
            detail: "Created",
        }
    },
    204: {
        http: {
            code: 204,
            detail: "No Content",
        }
    },
    400: {
        http: {
            code: 400,
            detail: "Error: Bad Request"
        }
    },
    401: {
        http: {
            code: 401,
            detail: "Error: Unauthorized"
        }
    },
    404: {
        http: {
            code: 404,
            detail: "Error: Not Found"
        }
    },
    500: {
        http: {
            code: 500,
            detail: "Error: Internal Server Error"
        }
    }
});

const Message = (msg, code) => {
    switch (code) {
        case 201:
            return {
                message: 'La creación se ha realizado con exito',
                description: msg,
            }
        case 204:
            return {
                message: 'La petición se ha completado con éxito pero su respuesta no tiene ningún contenido',
                description: msg,
            }
        case 400:
            return {
                message: 'La petición realizada ha fallado',
                description: msg
            }
        case 401:
            return {
                message: 'Hubo un error de autenticación',
                description: msg
            }
        case 404:
            return {
                message: 'No se ha encontrado el recurso solicitado o no existe',
                description: msg
            }
        case 500:
            return {
                message: 'Ocurrio un error inesperado',
                description: msg
            }
    
        default:
            return {
                message: msg
            }
    }
}

module.exports = {
    Codigo,
    Message
};