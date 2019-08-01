const { Schema, model } = require('mongoose');

// Declare the Schema of the Mongo model
const noteSchema = new Schema({
  title: String,
  content: {
    type: String,
    required:true,
  },
  author: String,
  date: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

//Export the model
module.exports = model('Note', noteSchema);