const mongoose = require('mongoose');

const { Schema } = mongoose;
const asignaturaSchema = new Schema({
  // Nombre de la asignatura
  nombre: {
    type: String,
    required: true
  },
  // Clave de la asignatura
  clave: {
    type: String,
    required: true
  },
  // Clave de la licenciatura
  claveLicenciatura: [{
    type: String,
    required: true
  }],
  // Clave de la semestre
  claveSemestre: [{
    type: String,
    required: true
  }]
});

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);

module.exports = { Asignatura, asignaturaSchema };