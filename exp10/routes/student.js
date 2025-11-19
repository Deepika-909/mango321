const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data', 'students.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = data => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// GET all
router.get('/', (req, res) => res.json(readData()));

// GET by ID
router.get('/:id', (req, res) => {
  const student = readData().find(s => s.id === +req.params.id);
  student ? res.json(student) : res.status(404).json({ message: 'Not found' });
});

// POST create
router.post('/', (req, res) => {
  const students = readData();
  const id = students.length ? students.at(-1).id + 1 : 1;
  const newStudent = { id, ...req.body };
  writeData([...students, newStudent]);
  res.status(201).json(newStudent);
});

// PUT update
router.put('/:id', (req, res) => {
  const students = readData();
  const idx = students.findIndex(s => s.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  students[idx] = { id: students[idx].id, ...req.body };
  writeData(students);
  res.json(students[idx]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const students = readData();
  const filtered = students.filter(s => s.id !== +req.params.id);
  if (filtered.length === students.length) return res.status(404).json({ message: 'Not found' });
  writeData(filtered);
  res.json({ message: 'Deleted' });
});

module.exports = router;