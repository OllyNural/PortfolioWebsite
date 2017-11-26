const express = require('express');
const morgan = require('morgan');
const path = require('path');
const data = require('./data.js');

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

// POST Request to send an email
app.post('/api/contact', (req, res) => {
  let data = req.body;
  
  // Init Mail Options to send
  let mailOptions = {
    from: 'oliver.nural@gmail.com',
    to: 'oliver.nural@gmail.com',
    subject: 'hello subject',
    text: 'hello text'
  };
  
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return true;
    }
  });
  
})



module.exports = app;