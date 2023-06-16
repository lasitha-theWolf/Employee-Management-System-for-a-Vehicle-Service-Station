const express = require('express');
const router = express.Router();
const pdfkit = require('pdfkit');
const fs = require('fs');
const { MongoClient } = require('mongodb');

// Replace the connection string with your own MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/employee-attendance';
const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

// Check if QR code has already been scanned today
router.get('/api/checkAttendance/:id', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const result = await client
      .db('employee-attendance')
      .collection('attendance')
      .findOne({ id: req.params.id, date: today });

    if (result) {
      res.send({ scannedToday: true, employeeName: result.name });
    } else {
      res.send({ scannedToday: false });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Save scanned data to the database
router.post('/api/saveAttendance', async (req, res) => {
  const { id, name, timestamp } = req.body;

  try {
    const result = await client
      .db('employee-attendance')
      .collection('attendance')
      .insertOne({ id, name, timestamp, date: new Date().toISOString().slice(0, 10) });

    if (result.insertedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Download PDF of attendance data
router.get('/api/downloadPDF', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const attendanceData = await client
      .db('employee-attendance')
      .collection('attendance')
      .find({ date: today })
      .toArray();

    // Create PDF using pdfkit
    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream('attendance.pdf'));

    doc.fontSize(20).text(`Employee Attendance - ${today}`);
    doc.moveDown();

    if (attendanceData.length > 0) {
      doc.fontSize(16).text('Employees present:');
      attendanceData.forEach((item) => {
        doc.fontSize(12).text(`${item.name} (${item.id})`);
      });
    } else {
      doc.fontSize(16).text('No employees present');
    }

    doc.end();
    res.download('attendance.pdf');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
