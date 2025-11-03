// session.js
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Visit count: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome! First visit.');
  }
});

app.listen(3000, () => {console.log('Session app running on port 3000');});
