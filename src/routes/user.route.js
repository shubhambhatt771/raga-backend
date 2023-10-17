const express = require("express");
const {
    login,
    register,
    logout,
    generateApiKey
  } = require("../controllers/user.controller");
  const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route('/api-key').post(generateApiKey);

module.exports = router;

