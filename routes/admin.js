const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/sessionMiddleware");
const checkRol = require("../middlewares/checkRoleMiddleware");
const { editUsers, editFiles, addFile, addUser, editUser, getUser, getFile} = require("../controllers/adminControllers");
const { getUserWithIdValidator, matriculaValidator } = require("../validators/userValidators");
const { createFileValidator } = require("../validators/fileValidators");

router.get("/users", authMiddleware, checkRol(["admin"]), editUsers); // renderiza la vista admin/users del catalogo users
router.post("/edit-user/:id", authMiddleware, checkRol(["admin"]), getUserWithIdValidator, editUser); // renderiza la vista admin/user para editar los datos de un usuario
router.get("/files", authMiddleware, checkRol(["admin"]), editFiles); // renderiza la vista admin/files del catalogo de file 
router.get("/add-file", authMiddleware, checkRol(["admin"]), addFile); // renderiza la vista para agregar files
router.get("/add-user", authMiddleware, checkRol(["admin"]), addUser); // renderiza la vista para agregar users
router.post("/searchFile", authMiddleware, checkRol(["user", "admin"]), createFileValidator, getFile);
router.post("/searchUser", authMiddleware, checkRol(["user", "admin"]), matriculaValidator,  getUser);

module.exports = router;    