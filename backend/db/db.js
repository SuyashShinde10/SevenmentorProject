const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/saas_employee_system')
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));