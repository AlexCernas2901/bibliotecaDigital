const express = require("express");
const router = express.Router();
const { registerValidator, loginValidator } = require("../validators/auth");
const { registerController, loginController } = require("../controllers/authControllers");

router.post("/register", registerValidator, registerController); // ruta de registro de usuarios
router.post("/login", loginValidator, loginController); // ruta de login de usuarios

module.exports = router;

