const mongoose = require('mongoose');

const { Schema } = mongoose;
const preguntaSchema = new Schema({
    // Texto de la pregunta
    texto: {
        type: String,
        required: true
    },
    // Referencia del cuestionario al que pertenece la pregunta
    idCuestionario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cuestionario'
    },
    respuestas: [{
        // Texto de la respuesta
        texto: {
            type: String,
            required: true
        },
        // Es la respuesta correcta
        esCorrecta: {
            type: Boolean,
            required: true
        },
        // Comentario (solo si la respuesta no es la correcta)
        comentario: {
            type: String,
            required: false
        },
    }]
}, { versionKey: false });

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = { Pregunta, preguntaSchema };