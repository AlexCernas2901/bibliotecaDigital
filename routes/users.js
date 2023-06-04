const express = require("express");
const router = express.Router();
const { getUser, getUsers, deleteUser, updateUser, editUser, createUser } = require("../controllers/userControllers");
const { getUserWithIdValidator, getBodyUserValidator, getUserPasswordValidator } = require("../validators/userValidators");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");
// const { registerValidator } = require("../validators/auth");

//router.get("/", authMiddleware, checkRol(["admin"]), getUsers); // ruta para seleccionar todos los usuarios
router.get('/edit/:id', authMiddleware, checkRol(["admin"]), getUserWithIdValidator, editUser); // ruta para renderizar vista de editar un usuario
router.get("/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, getUser); // ruta para seleccionar un usuario
router.post("/update/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, getBodyUserValidator, updateUser); // ruta para actualizar un usuario
router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, deleteUser); // ruta para eliminar un usuario
router.post("/create", authMiddleware, checkRol(["admin"]), getBodyUserValidator, getUserPasswordValidator, createUser); // ruta para crear el usuario

module.exports = router;