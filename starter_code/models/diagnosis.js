const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  speciality: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
     type: String,
     default: ''
  },
  user: {
    type: String,
    default: ''
  }
  
});

const Diagnosis = mongoose.model('Diagnosis', schema);

module.exports = Diagnosis;