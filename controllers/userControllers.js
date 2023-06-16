const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const sanitizeHtml = require("sanitize-html");
const { handleHttpError } = require("../utils/handleError");

// controlador para obtener usuarios
const getUsers = async (req, res) => {
  try {
    const user = req.session.data.user;
    const data = await usersModel.find({});
    console.log(data);
    res.json({ data, user });
  } catch (e) {
    handleHttpError(res, "Error al obtener usuarios");
  }
};

// controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    const userData = matchedData(req);
    const encryptedPassword = await encrypt(userData.password);

    // verificar si ya existe un usuario con la misma matrícula
    const existingUser = await usersModel.findOne({ matricula: userData.matricula });
    if (existingUser) {
      return handleHttpError(res, "Error matricula en uso");
    }

    const savedUser = await usersModel.create({
      name: sanitizeHtml(userData.name),
      matricula: sanitizeHtml(userData.matricula),
      password: encryptedPassword,
      role: sanitizeHtml(userData.role),
    });

    const responseData = {
      token: await signToken(savedUser),
      user: savedUser,
    };

    console.log(responseData);
    res.redirect("/admin/users");
  } catch (e) {
    handleHttpError(res, "Error al crear usuario");
  }
};

// controlador para editar un usuario
const editUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById({ _id: id });
    console.log(data);
    res.json({ data });
  } catch (e) {
    handleHttpError(res, "Error al editar usuario");
  }
};

// controlador para obtener un usuario
const getUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById(id);
    console.log(data);
    res.json({ data });
  } catch (e) {
    handleHttpError(res, "Error al buscar usuario");
  }
};

// controlador para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    await usersModel.deleteOne({ _id: id });
    res.redirect("/admin/users");
  } catch (e) {
    handleHttpError(res, "Error al eliminar usuario");
  }
};

// controlador para actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id, ...body } = requestData;
    console.log(id, body);
    const data = await usersModel.findOneAndUpdate({ _id: id }, body);
    console.log(data);
    res.redirect("/admin/users");
  } catch (e) {
    handleHttpError(res, "Error al actualizar usuario");
  }
};

// controlador para editar el perfil de usuario
const editProfile = async (req, res) => {
  try {
    const user = req.session.data.user;
    res.json({ user });
  } catch (e) {
    handleHttpError(res, "Error vista editProfile");
  }
};

// controlador para cambiar la contraseña
const changePass = async (req, res) => {
  try {
    // logica para cambio de contraseña (en desarrollo)
    res.send("Hola");
  } catch (e) {
    handleHttpError(res, "Error al actualizar contraseña");
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  editUser,
  createUser,
  editProfile,
  changePass
};
