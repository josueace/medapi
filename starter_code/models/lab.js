const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  labdate: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  results: {
    type: String,
    default: ''
  },
   user: {
    type: String,
    default: ''
  }
  
});

const Lab = mongoose.model('Lab', schema);

module.exports = Lab;