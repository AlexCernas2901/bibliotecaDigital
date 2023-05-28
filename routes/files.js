const express = require("express");
const router = express.Router();
const { getFile, getFiles, deleteFile, updateFile, createFile, editFile, getFileByName  } = require("../controllers/filesControllers");
const { getFileWithIdValidator, filenameValidator } = require("../validators/fileValidators");
const uploadMiddleware = require("../utils/handdleStorage");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.get("/", authMiddleware, checkRol(["user", "admin"]), getFiles); // ruta para seleccionar todos los archivos

router.post("/search", authMiddleware, checkRol(["user", "admin"]), filenameValidator, getFileByName); // ruta para seleccionararchivos por tutulo

router.get("/:id", authMiddleware, checkRol(["user", "admin"]), getFileWithIdValidator, getFile); // ruta para seleccionar un archivo

router.post("/create", uploadMiddleware.single("myfile"), createFile); // ruta para crear un archivo

router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getFileWithIdValidator, deleteFile); // ruta para eliminar un archivo

module.exports = router;