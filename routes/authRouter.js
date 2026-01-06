// external modules
const express = require("express");
const authRouter = express.Router();

// Local module (CONTROLLER - correct place)
const authController = require("../controllers/authController");

// Home Page Route
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
