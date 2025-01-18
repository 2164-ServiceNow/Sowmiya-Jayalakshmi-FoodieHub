const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files from the assets folder
app.use(express.static(path.join(__dirname, 'assets')));

// Serve AngularJS index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Custom registration API
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Read database
  const dbPath = './db.json';
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // Check if user already exists
  const existingUser = db.users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Add new user and write back to the database
  db.users.push({ username, password });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json({ message: "Registration successful." });
});

// Custom login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read database
  const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

  // Find user
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
