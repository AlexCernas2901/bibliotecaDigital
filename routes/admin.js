const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

const { editUsers, editFiles, addFile } = require("../controllers/adminControllers");

router.get("/users", authMiddleware, checkRol(["admin"]), editUsers);

router.get("/files", authMiddleware, checkRol(["admin"]), editFiles);

router.get("/add-file", authMiddleware, checkRol(["admin"]), addFile);

module.exports = router;    