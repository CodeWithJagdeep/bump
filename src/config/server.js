const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Start the Express server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});

module.exports = app;
