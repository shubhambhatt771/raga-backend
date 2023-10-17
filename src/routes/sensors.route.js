const express = require("express");
const {
  viewSensorsData,
  createSensorsData,
  setCaliberations
} = require("../controllers/sensors.controller");
const apikeysModel = require("../models/apikeys.model");
const router = express.Router();

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Assuming the API key is in the headers

  if (!apiKey) {
    return res.status(401).json({ message: 'API key is required' });
  }

  // Check if the API key exists in the database
  let key = await apikeysModel.findOne({ key: apiKey });
  if(!key){
    return res.status(403).json({ message: 'Invalid API key' });
  }
  next();
};

router.route("/").get(viewSensorsData);
router.route("/json-data").post(apiKeyMiddleware ,createSensorsData);
router.route("/caliberation").post(apiKeyMiddleware, setCaliberations);
module.exports = router;

