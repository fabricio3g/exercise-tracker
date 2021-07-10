const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  }
});

const User = model("User", userSchema);

module.exports = User;
