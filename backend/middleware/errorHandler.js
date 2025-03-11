const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Handle specific error types
  if (err.status) {
      return res.status(err.status).json({ error: err.message });
  }

  // Default to 500 Internal Server Error
  res.status(500).json({ error: "Internal Server Error. Please try again later." });
};

module.exports = errorHandler;
