// cookie.js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  const user = 'deeps';
  res.send(`Welcome back, ${user}`);
});

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', { maxAge: 3600000 }); // 1 hour
  res.send('Cookie has been set!');
});

app.listen(3000, () => console.log('Cookie app running on port 3000'));
