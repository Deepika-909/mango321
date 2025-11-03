const express = require('express');
const fs = require('fs');
const router = express.Router();

const file = './students.json';

// Read student data from file
function getStudents() {
  return JSON.parse(fs.readFileSync(file));
}

// Save student data to file
function saveStudents(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// GET all students
router.get('/', (req, res) => {
  res.json(getStudents());
});

// GET student by ID
router.get('/:id', (req, res) => {
  const students = getStudents();
  const student = students.find(s => s.id == req.params.id);
  student ? res.json(student) : res.status(404).json({ message: 'Not found' });
});

// POST new student
router.post('/', (req, res) => {
  const students = getStudents();
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  saveStudents(students);
  res.status(201).json(newStudent);
});

// PUT update student
router.put('/:id', (req, res) => {
  const students = getStudents();
  const index = students.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  students[index] = { id: +req.params.id, ...req.body };
  saveStudents(students);
  res.json(students[index]);
});

// DELETE student
router.delete('/:id', (req, res) => {
  let students = getStudents();
  const exists = students.some(s => s.id == req.params.id);
  if (!exists) return res.status(404).json({ message: 'Not found' });
  students = students.filter(s => s.id != req.params.id);
  saveStudents(students);
  res.json({ message: 'Deleted' });
});

module.exports = router;
