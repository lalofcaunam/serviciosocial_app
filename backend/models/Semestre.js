const mongoose = require('mongoose');

const { Schema } = mongoose;
const semestreSchema = new Schema({
  // Nombre del semestre
  nombre: {
    type: String,
    required: true
  },
  // Clave del semestre
  clave: {
    type: String,
    required: true
  }
});

const Semestre = mongoose.model('Semestre', semestreSchema);

module.exports = { Semestre, semestreSchema };