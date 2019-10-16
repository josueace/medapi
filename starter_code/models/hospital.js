const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  phone: {
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

const HospitalDoc = mongoose.model('HospitalDoc', schema);

module.exports = HospitalDoc;