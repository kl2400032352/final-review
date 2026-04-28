const Submission = require('../models/Submission');
const Project = require('../models/Project');

exports.submitWork = async (req, res) => {
  const { fileUrl, comment } = req.body;
  try {
    const submission = new Submission({
      project: req.params.projectId,
      student: req.user.id,
      fileUrl,
      comment
    });
    await submission.save();
    res.json({ msg: 'Submission successful', submission });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ project: req.params.projectId }).populate('student', 'name email');
    res.json(submissions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
