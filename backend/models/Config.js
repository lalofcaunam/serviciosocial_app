const mongoose = require('mongoose');

const { Schema } = mongoose;
const configSchema = new Schema({
  // Fecha en la que se da de alta
  fechaCreacion: {
    type: Date,
    required: true
  },
});

const Config = mongoose.model('Config', configSchema);

module.exports = { Config, configSchema };