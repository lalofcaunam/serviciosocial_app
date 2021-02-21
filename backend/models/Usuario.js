const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const logger = require('log4js').getLogger('Usuario');

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;
const usuarioSchema = new Schema({
    // Nombre del usuario
    nombre: {
        type: String,
        required: true
    }, 
    // Apellido Paterno del usuario
    apellidoPaterno: {
        type: String,
        required: true
    },
    // Apellido Materno del usuario
    apellidoMaterno: {
        type: String,
        required: false
    }, 
    // Correo electronico
    correo: {
        type: String,
        required: true
    },
    // Contraseña
    contrasenia: {
        type: String,
        required: true
    },
    // clave del usuario
    clave: {
        type: String,
        required: true
    },
    // Campo para activación de email
    correoActivado: {
        type: Boolean,
        default: false
    },
    // Rol del usuario
    rol: {
        type: String,
        required: true,
        enum: {
          values: ['Profesor', 'Alumno']
        }
    },
}, { versionKey: false });

// Metodo para encriptar la contraseña
usuarioSchema.pre('save', function (next) {
    const user = this;

    logger.info(user);
  
    // Solo encriptar la contraseña si es nueva o esta siendo modificada
    if (!user.isModified('contrasenia')) return next();
  
    // Generar salto
    return bcrypt.genSalt(SALT_WORK_FACTOR, function (errSalt, salt) {
        if (errSalt) return next(errSalt);
    
        // Encriptar contraseña con el nuevo salto
        return bcrypt.hash(user.contrasenia, salt, function (errHash, hash) {
            if (errHash) return next(errHash);
    
            // Sobreecribir la contraseña en claro por la encriptada
            user.contrasenia = hash;
            logger.info(user.contrasenia);
            return next();
        });
    });
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = { Usuario, usuarioSchema };
