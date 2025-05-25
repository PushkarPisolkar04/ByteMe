const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const conversionRoutes = require("./routes/conversionRoutes");
const errorHandler = require("./middleware/errorHandler");
const securityMiddleware = require("./middleware/security");

dotenv.config(); 

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

securityMiddleware(app);


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use("/api", conversionRoutes); 


app.get("/", (req, res) => {
  res.json({ status: "API is operational" });
});


app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
