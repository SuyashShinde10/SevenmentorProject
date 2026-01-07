const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: { type: String, required: true },
  hrId: { type: mongoose.Schema.Types.ObjectId, ref: 'HR', required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);