const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/loginControllers");

router.get("/", login); // renderiza login
router.post("/logout", logout); // cierra la sesion del usuario

module.exports = router;    