const Task = require('../models/taskModel');
const mongoose = require('mongoose');  

 
const assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo, createdBy, deadline } = req.body;

    if (new Date(deadline) < new Date().setHours(0,0,0,0)) {
       return res.status(400).json({ message: "Deadline cannot be in the past" });
    }

    
    const groupId = new mongoose.Types.ObjectId(); 

    const promises = assignedTo.map((empId) => {
        return Task.create({
            title,
            description,
            assignedTo: empId,
            createdBy,
            deadline,
            status: 'Pending',
            groupId: groupId  
        });
    });

    await Promise.all(promises);
    res.status(201).json({ message: "Tasks assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
const getHrTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.hrId }).populate('assignedTo', 'name'); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.empId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let updateData = { status };
    if (status === 'Completed') updateData.completedAt = new Date();
    
    const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, deadline }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { assignTask, getHrTasks, getMyTasks, updateTaskStatus, updateTask, deleteTask };