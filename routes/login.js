const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/login");

router.get('/', login);

router.post('/logout', logout);

module.exports = router;    