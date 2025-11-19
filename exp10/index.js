const express = require('express');
const studentRoutes = require('./routes/student');

const app = express();
const PORT = 3000;

app.use(express.json()); // built-in parser (no body-parser)
app.use('/api/students', studentRoutes);

app.listen(PORT,
     () => console.log(`Server: http://localhost:${PORT}`));
