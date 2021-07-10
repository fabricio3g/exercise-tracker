const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    require: true
  },
  log: [
    {
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ]
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
