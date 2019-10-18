const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  visitdate: {
    type: String,
    default: ''
  },
  hospital: {
    type: String,
    default: ''
  },
  doctor: {
    type: String,
    default: ''
  },
  reason: {
     type: String,
     default: ''
  },
  diagnosis: {
    type: String,
    default: ''
  },
   user: {
    type: String,
    default: ''
  }
  
});

const Visit = mongoose.model('Visit', schema);

module.exports = Visit;