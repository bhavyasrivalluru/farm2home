const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with DB like MongoDB/MySQL later)
let messages = [];

// Save a new message
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    subject,
    message,
    date: new Date()
  };

  messages.push(newMessage);

  res.json({ success: true, message: "Message received!", data: newMessage });
});

// Get all messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
