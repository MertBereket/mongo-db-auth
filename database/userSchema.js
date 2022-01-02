const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    max: 255,
  },
  Surname: {
    type: String,
    required: true,
    max: 255,
  },
  City: {
    type: String,
    required: true,
    max: 255,
  },
  eMail: {
    type: String,
    required: true,
    max: 255,
  },
  Password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
