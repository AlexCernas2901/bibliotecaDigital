const express = require("express");
const router = express.Router();
const { getUser, getUsers, deleteUser, updateUser, editUser } = require("../controllers/userControllers");
const { getUserWithIdValidator } = require("../validators/userValidators");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");
const { registerValidator } = require("../validators/auth");

router.get("/", authMiddleware, checkRol(["admin"]), getUsers); // ruta para seleccionar todos los usuarios

router.get('/edit/:id', authMiddleware, checkRol(["admin"]), getUserWithIdValidator, editUser); // ruta para renderizar vista de editar un usuario

router.get("/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, getUser); // ruta para seleccionar un usuario

router.post("/update/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, registerValidator, updateUser); // ruta para actualizar un usuario

router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, deleteUser); // ruta para eliminar un usuario

module.exports = router;