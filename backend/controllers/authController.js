const HR = require('../models/hrModel');
const Employee = require('../models/employeeModel');

const registerHR = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;
    const hr = await HR.create({ companyName, email, password });
    res.status(201).json({ success: true, data: hr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === 'hr') {
      user = await HR.findOne({ email, password });
    } else {
      user = await Employee.findOne({ email, password });
    }

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    res.json({ success: true, id: user._id, role: role, name: user.name || user.companyName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerHR, login };