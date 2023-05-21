const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/loginControllers");

router.get("/", login);

router.post("/logout", logout);

module.exports = router;    