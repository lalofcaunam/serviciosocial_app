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
}, { versionKey: false });

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = { Pregunta, preguntaSchema };