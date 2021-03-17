const mongoose = require('mongoose');

const { Schema } = mongoose;
const licenciaturaSchema = new Schema({
  // Nombre de la Licenciatura
  nombre: {
    type: String,
    required: true
  },
  // Clave de la licenciatura
  clave: {
    type: String,
    required: true
  }
}, { versionKey: false });

const Licenciatura = mongoose.model('Licenciatura', licenciaturaSchema);

module.exports = { Licenciatura, licenciaturaSchema };