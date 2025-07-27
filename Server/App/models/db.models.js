let mongoose = require("mongoose");

let schemaDb = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

let DB_Model = mongoose.model("User_Table", schemaDb);

module.exports = DB_Model;
