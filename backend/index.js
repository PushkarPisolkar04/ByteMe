const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conversionRoutes = require("./routes/conversionRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Support URL-encoded data

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", conversionRoutes); // Use conversion routes under '/api'

// Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("API is working fine!"); // Simple message to confirm the API is running
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
