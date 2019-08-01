const {Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, {
  timestamps: true
});

//Export the model
module.exports = model('User', userSchema);