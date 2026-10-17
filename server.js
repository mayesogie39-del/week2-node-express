
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON
app.use(express.json());

// Serve static HTML files
app.use(express.static(path.join(__dirname, "public")));

// Bonus: Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} profile`
  });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
