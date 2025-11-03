const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = 'secret123';
const file = './users.json';

function getUsers() {
  return JSON.parse(fs.readFileSync(file));
}
function saveUsers(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Register
router.post('/register', async (req, res) => {
  const users = getUsers();
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashed };
  users.push(newUser);
  saveUsers(users);
  res.json({ message: 'Registered' });
});

// Login
router.post('/login', async (req, res) => {
  const users = getUsers();
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;