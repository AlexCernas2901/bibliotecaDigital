const express = require("express");
const router = express.Router();
const { getFile, getFiles, deleteFile, updateFile, createFile, editFile } = require("../controllers/adminControllers");
const { getFileWithIdValidator } = require("../validators/fileValidators");
const uploadMiddleware = require("../utils/handdleStorage");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.get("/", authMiddleware, getFiles); // ruta para seleccionar todos los archivos

// ruta para renderizar vista de editar un archivo
// router.get('/edit/:id', getFileWithIdValidator, editFile);

router.get("/:id", authMiddleware, getFileWithIdValidator, getFile); // ruta para seleccionar un archivo

// ruta para actualizar un archivo
// router.post("/update/:id", getFileWithIdValidator, createFileValidator, updateFile);

router.post("/", authMiddleware, checkRol(["admin"]), uploadMiddleware.single("myfile"), createFile); // ruta para crear un archivo

router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getFileWithIdValidator, deleteFile); // ruta para eliminar un archivo

module.exports = router;