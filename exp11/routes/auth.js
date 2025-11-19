const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = "myjwtsecretkey";

const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const writeUsers = (data) => fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  writeUsers(users);
  res.json({ message: "User registered" });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});


const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ message: "No token" });

  const token = header.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = { router, verifyToken };
