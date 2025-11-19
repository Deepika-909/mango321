const express = require('express');
const studentRoutes = require('./routes/student');
const { router: authRoutes } = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);       // <-- NEW
app.use('/api/students', studentRoutes);

app.listen(PORT, () =>
  console.log(`Server: http://localhost:${PORT}`)
);
