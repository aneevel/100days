const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.get("/login", authController.getLogin);

router.post("/signup", authController.createUser);

router.post("/login", authController.loginUser);

router.post('/logout', authController.logoutUser);

router.get('/401', authController.get401);

module.exports = router;
