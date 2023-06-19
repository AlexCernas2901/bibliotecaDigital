const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/loginControllers");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.get("/", login); // renderiza login
router.post("/logout", authMiddleware, checkRol(["user", "admin"]),logout); // cierra la sesion del usuario

module.exports = router;    