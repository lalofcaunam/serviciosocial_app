const mongoose = require('mongoose');

const { Schema } = mongoose;
const respuestaSchema = new Schema({
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
    // Referencia de la pregunta al que pertenece la respuesta
    idPregunta: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pregunta'
    },
}, { versionKey: false });

const Respuesta = mongoose.model('Respuesta', respuestaSchema);

module.exports = { Respuesta, respuestaSchema };