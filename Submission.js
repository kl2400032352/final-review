const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  comment: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
