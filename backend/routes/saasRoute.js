const express = require("express");
const router = express.Router();
const { registerHR, login } = require("../controllers/authController");
const { createEmployee, getEmployeesByHR, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const { assignTask, getHrTasks, getMyTasks, updateTaskStatus, updateTask, deleteTask } = require("../controllers/taskController");

 
router.post("/auth/register-hr", registerHR);
router.post("/auth/login", login);

 
router.post("/emp/create", createEmployee);
router.get("/emp/list/:hrId", getEmployeesByHR);
router.put("/emp/update/:id", updateEmployee); // NEW
router.delete("/emp/delete/:id", deleteEmployee);

 
router.post("/task/assign", assignTask);
router.get("/task/hr/:hrId", getHrTasks);
router.get("/task/emp/:empId", getMyTasks);
router.put("/task/status/:id", updateTaskStatus);
router.put("/task/update/:id", updateTask); // NEW
router.delete("/task/delete/:id", deleteTask); // NEW

module.exports = router;