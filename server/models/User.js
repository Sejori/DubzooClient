// Mongoose requires
const mongoose = require('mongoose');
const { Schema } = mongoose;

// define schema for model
const userScema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// create the user model to be used for adding to/creating users collection in db
module.exports = mongoose.model('users', userScema);
