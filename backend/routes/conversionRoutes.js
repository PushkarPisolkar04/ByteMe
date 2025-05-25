const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/conversionController");

router.post("/convert", conversionController.convertNumber);

module.exports = router;
