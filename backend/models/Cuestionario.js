const mongoose = require('mongoose');

const { Schema } = mongoose;
const cuestionarioSchema = new Schema({
  // Nombre del cuestionario
  nombre: {
    type: String,
    required: true
  },
  // Tema del cuestionario
  tema: {
    type: String,
    required: true
  },
  // Tiempo estimado para realizar el cuestionario
  tiempo: {
    type: String,
    required: false
  },
  // Fecha en la que se creo el cuestionario
  fechaCreacion: {
    type: Date,
    required: true
  }, 
  // Clave de la asignatura
  claveAsignatura: {
    type: String,
    required: true
  },
  // Clave de la licenciatura a la que pertenece la asignatura
  claveLicenciatura: {
    type: String,
    required: true
  },
  // Clave del semestre al que pertenece la asignatura
  claveSemestre: {
    type: String,
    required: true
  },
  // Referencia del usuario con rol de profesor que creo el cuestionario
  idProfesor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  // Activo: Listo para que los alumnos lo vean, Inactivo: solo el profesor lo ve y esta editando
  estatus: {
    type: Boolean,
    required: true
  }
}, { versionKey: false });

const Cuestionario = mongoose.model('Cuestionario', cuestionarioSchema);

module.exports = { Cuestionario, cuestionarioSchema };