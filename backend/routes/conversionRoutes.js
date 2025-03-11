const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/conversionController");

// Route for handling all number conversions
router.post("/convert", conversionController.convertNumber);

module.exports = router;
