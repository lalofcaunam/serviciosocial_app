const mongoose = require('mongoose');

const { Schema } = mongoose;
const historialSchema = new Schema({
    // Respuestas de cada pregunta que selecciono el alumno
    respuestas: [{
        // Texto de la pregunta
        pregunta: {
            type: String,
            required: true
        },
        // Cuerpo de la respuesta
        respuesta: {
            // Si la respuesta es o no correcta
            esCorrecta: {
                type: Boolean,
                required: true
            },
            // Texto de la respuesta
            texto: {
                type: String,
                required: true
            },
            // Comentario
            comentario: {
                type: String,
                required: true
            },
        }
    }],
    // Referencia del cuestionario al que pertenece la pregunta
    idCuestionario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cuestionario'
    },
    // Referencia del cuestionario al que pertenece la pregunta
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cuestionario'
    },
    // Fecha en la que se esta realizando el cuestionario
    fechaRealizacion: {
        type: Date,
        required: true
    },
    // Número de preguntas buenas
    buenas: {
        type: Number,
        required: true
    },
    // Número de preguntas malas
    malas: {
        type: Number,
        required: true
    },
}, { versionKey: false });

const Historial = mongoose.model('Historial', historialSchema);

module.exports = { Historial, historialSchema };