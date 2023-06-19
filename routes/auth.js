const express = require("express");
const router = express.Router();
const { registerValidator, loginValidator } = require("../validators/auth");
const { registerController, loginController } = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.post("/register", registerValidator, authMiddleware, checkRol(["admin"]), registerController); // ruta de registro de usuarios
router.post("/login", loginValidator, loginController); // ruta de login de usuarios

module.exports = router;

