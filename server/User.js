const mongoose = require('mongoose');

module.exports = function(db1) {
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phno: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String
    }
  });
  const User = db1.model('Users', userSchema);

  return User;
};
