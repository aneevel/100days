const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false }));

app.get('/currenttime', (req, res) => {
  res.send('<h1>' + new Date().toISOString() + '</h1>');
});

app.get('/', (req, res) => {
  res.send('<form action="/store-user" method="POST"><label>Your Name</label><input name="username" type="text"><button>Submit</button></form>');
});

app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>');
});

app.get('/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = '<ul>';

  for (const user of existingUsers)
  {
    responseData += '<li>' + user + '</li>';
  }

  responseData += "</ul>";

  res.send(responseData);
})

app.listen(3000);