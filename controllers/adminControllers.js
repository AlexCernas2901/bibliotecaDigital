const { filesModel } = require("../models");
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const { handleHttpError } = require("../utils/handleError");

// controlador para obtener la vista de edicion de usuarios
const editUsers = async (req, res) => {
  try {
    const user = req.session.data.user;
    const usersData = await usersModel.find({});
    res.json({ usersData, user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista editUsers", 500);
  }
};

// controlador para obtener la vista del formulario de agregar archivo
const addFile = async (req, res) => {
  try {
    const user = req.session.data.user;
    res.json({ user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista addFile", 500);
  }
};

// controlador para obtener la vista de edicion de archivos
const editFiles = async (req, res) => {
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    res.json({ filesData, user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista editFiles", 500);
  }
};

// controlador para obtener la vista del formulario de agregar usuario
const addUser = async (req, res) => {
  try {
    const user = req.session.data.user;
    res.json({ user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista addUser", 500);
  }
};

// controlador para obtener la vista de edicion de datos de usuario
const editUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const sanitizedId = sanitizeHtml(id);

    const userData = await usersModel.findById(sanitizedId);
    console.log(userData);
    res.json({ userData });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista editUser", 500);
  }
};

// controlador para obtener la vista de archivo
const getFile = async (req, res) => {
  try {
    const { tittle } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ tittle });
    res.json({ filesData, user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista de getFile ", 500);
  }
}

// controlador para obtener la vista de usuario
const getUser = async (req, res) => {
  try {
    const { matricula } = req.body;
    const user = req.session.data.user;
    const usersData = await usersModel.find({ matricula });
    res.json({ usersData, user });
  } catch (e) {
    handleHttpError(res, "Error al obtener la vista getUser", 500);
  }
}

module.exports = {
  editFiles,
  editUsers,
  addFile,
  addUser,
  editUser,
  getFile,
  getUser
};