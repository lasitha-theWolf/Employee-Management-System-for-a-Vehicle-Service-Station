// Employee model
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


// Attendance model
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  timestamp: { type: Date, required: true },
});

attendanceSchema.index({ employee: 1, timestamp: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
