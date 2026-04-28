const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{
    title: String,
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
  }],
  milestones: [{
    title: String,
    percentage: Number
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);
