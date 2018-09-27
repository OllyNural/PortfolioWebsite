const express = require('express');
const morgan = require('morgan');
const path = require('path');

const nodemailer = require('nodemailer');

const app = express();

// Setup nodemailer transporter
let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: data.username,
    pass: data.password
  }
})

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
});


module.exports = app;