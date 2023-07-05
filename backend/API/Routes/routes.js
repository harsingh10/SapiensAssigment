const express = require("express");
const router = express.Router();
const controller = require("../Controllers/controller.js");
const checkAuth = require("../Middlewares/checkAuth");

router.get("/check", (req, res) => {
  res.send("Sapiens Assignment is working fine");
});

router.post("/signUp", controller.initiateUser);
router.post("/login", controller.loginUser);
router.post("/setTheme", checkAuth, controller.setTheme);
router.post("/profile", checkAuth, controller.getProfile);

module.exports = router;
