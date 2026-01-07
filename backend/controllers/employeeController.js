const Employee = require('../models/employeeModel');

const createEmployee = async (req, res) => {
  try {
    const { name, email, password, designation, hrId } = req.body;
    const employee = new Employee({ name, email, password, designation, hrId });
    const result = await employee.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmployeesByHR = async (req, res) => {
  try {
    const employees = await Employee.find({ hrId: req.params.hrId });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
const updateEmployee = async (req, res) => {
  try {
    const { name, email, designation } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id, 
      { name, email, designation }, 
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.send('Employee deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEmployee, getEmployeesByHR, updateEmployee, deleteEmployee };