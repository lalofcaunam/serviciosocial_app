const Codigo = Object.freeze({
    201: {
        http: {
            code: 201,
            message: "Created",
        }
    },
    400: {
        http: {
            code: 400,
            message: "Error: Bad Request"
        }
    },
    401: {
        http: {
            code: 401,
            message: "Error: Unauthorized"
        }
    },
    404: {
        http: {
            code: 404,
            message: "Error: Not Found"
        }
    },
    500: {
        http: {
            code: 500,
            message: "Error: Internal Server Error"
        }
    }
});

module.exports = {
    Codigo
};