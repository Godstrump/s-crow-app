const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstname: { type: String, default: null, required: true },
  lastname: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  membershipType: { type: String},
  token: { type: String },
},
  { collection: 'users'}
);

module.exports = mongoose.model("Users", User);