const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve the static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Custom registration API
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
  const existingUser = db.users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  db.users.push({ username, password });
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
  res.status(201).json({ message: "Registration successful." });
});

// Custom login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful." });
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
