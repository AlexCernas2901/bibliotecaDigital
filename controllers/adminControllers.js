const { filesModel } = require("../models");
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const sanitizeHtml = require("sanitize-html");

const editUsers = async (req, res) => { // declarando controlador renderizar la vista admin-users

  try {
    const user = req.session.data.user;
    const usersData = await usersModel.find({});
    const alerts = req.session.alerts || [];
    delete req.session.alerts; // eliminar los mensajes de alerta después de obtenerlos
    res.render("admin-users", { usersData, alerts, user, main: false });
  } catch (e) {
    req.session.alert = "Error al intentar obtener usuarios";
    return res.redirect("/admin/users");
  }
};

const addFile = async (req, res) => { // declarando controlador para renderizar la vista add-file
  try {
    const user = req.session.data.user;
    res.render("add-file", { user, main: false });
  } catch (e) {
    req.session.alert = "Error al intentar agregar archivo";
    return res.redirect("/admin/files");
  }
};

const editFiles = async (req, res) => { // declarando controlador para renderizar la vista admin-files
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    const alerts = req.session.alerts || [];
    delete req.session.alerts; // eliminar los mensajes de alerta después de obtenerlos
    res.render("admin-files", { filesData, alerts, user, main: false });
  } catch (e) {
    req.session.alert = "Error al intentar obtener archivos";
    return res.redirect("/admin/files");
  }
};

const addUser = async (req, res) => { // declarando controlador para renderizar la vista add-user
  try {
    const user = req.session.data.user;
    const alerts = req.session.alerts || [];
    delete req.session.alerts; // eliminar los mensajes de alerta después de obtenerlos
    res.render("add-user", { user, alerts, main: false });
  } catch (e) {
    req.session.alert = "Error al intentar agregar usuario";
    return res.redirect("/admin/users");
  }
};

const editUser = async (req, res) => { // declarando controlador para renderizar la vista edit-user
  try {
    const { id } = matchedData(req);
    const sanitizedId = sanitizeHtml(id);

    const userData = await usersModel.findById(sanitizedId);
    const alert = req.session.alert;
    delete req.session.alert; // eliminar el mensaje de alerta después de obtenerlo
    console.log(userData);
    res.render("edit-user", { alert, userData });
  } catch (e) {
    req.session.alert = "Error al intentar editar usuario";
    return res.redirect("/admin/user");
  }
};

const getFile = async (req, res) => {
  try {
    const { tittle } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ tittle });
    const alerts = req.session.alerts || [];
    delete req.session.alerts;
    res.render("admin-files", { alerts, filesData, user, main: false });
  } catch (e) {
    req.session.alerts = ["Error al intentar buscar el archivo"];
    return res.redirect("/files");
  }
}

const getUser = async (req, res) => {
  try {
    const { matricula } = req.body;
    const user = req.session.data.user;
    const usersData = await usersModel.find({ matricula });
    const alerts = req.session.alerts || [];
    delete req.session.alerts;
    res.render("admin-users", { alerts, usersData, user, main: false });
  } catch (e) {
    req.session.alerts = ["Error al intentar buscar el archivo"];
    return res.redirect("/files");
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