const express = require("express");
const router = express.Router();
const { getFile, getFiles, deleteFile, createFile, getFileByName  } = require("../controllers/filesControllers");
const { getFileWithIdValidator, createFileValidator } = require("../validators/fileValidators");
const uploadMiddleware = require("../utils/handleStorage");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.get("/", authMiddleware, checkRol(["user", "admin"]), getFiles); // ruta para seleccionar todos los archivos
router.post("/search", authMiddleware, checkRol(["user", "admin"]), createFileValidator, getFileByName); // ruta para seleccionararchivos por titulo
router.get("/:id", authMiddleware, checkRol(["user", "admin"]), getFileWithIdValidator, getFile); // ruta para seleccionar un archivo
router.post("/create", authMiddleware, checkRol(["admin"]), uploadMiddleware.single("filename"), createFileValidator, createFile); // ruta para crear un archivo
router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getFileWithIdValidator, deleteFile); // ruta para eliminar un archivo

module.exports = router;