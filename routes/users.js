const express = require("express");
const router = express.Router();
const { editProfile, getUser, deleteUser, updateUser, editUser, createUser, changePass } = require("../controllers/userControllers");
const { getUserWithIdValidator, verifyPassData,  getBodyUserValidator, getUserPasswordValidator } = require("../validators/userValidators");
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");

router.get("/profile", authMiddleware, checkRol(["user", "admin"]), editProfile); // ruta para renderizar la vista de edicion de contraseña
router.get("/edit/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, editUser); // ruta para renderizar vista de editar un usuario
router.get("/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, getUser); // ruta para seleccionar un usuario
router.post("/update/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, getBodyUserValidator, updateUser); // ruta para actualizar un usuario
router.post("/delete/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, deleteUser); // ruta para eliminar un usuario
router.post("/create", authMiddleware, checkRol(["admin"]), getBodyUserValidator, getUserPasswordValidator, createUser); // ruta para crear el usuario
router.post("/changePass", authMiddleware, checkRol(["user", "admin"]), verifyPassData, changePass); // ruta para actualizar la contraseña

module.exports = router;