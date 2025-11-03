/*const express = require('express');
const app = express();
app.use(express.json());
app.use('/students', require('./student'));
app.listen(3000, () => console.log('Server running'));
*/

const express = require('express');
const app = express();
const verifyToken = require('./middleware');

app.use(express.json());
app.use('/auth', require('./auth'));
app.use('/students', verifyToken, require('./student')); // Protected routes

app.listen(3000, () => console.log('Server running'));
