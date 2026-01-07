const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedDate: { type: Date, default: Date.now }, // NEW FIELD
  status: { type: String, default: 'Pending' },
  completedAt: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'HR' },
  groupId: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);