const Project = require('../models/Project');
const User = require('../models/User');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('assignedStudents', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createProject = async (req, res) => {
  const { title, description, deadline, tasks, milestones } = req.body;
  try {
    const project = new Project({ title, description, deadline, tasks, milestones });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('assignedStudents', 'name email');
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.assignStudents = async (req, res) => {
  const { studentIds } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    project.assignedStudents = studentIds;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    task.status = status;
    await project.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
