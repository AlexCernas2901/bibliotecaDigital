const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const sanitizeHtml = require("sanitize-html");

const getUsers = async (req, res) => {
  try {
    const user = req.session.data.user;
    const data = await usersModel.find({});
    console.log(data);
    res.send({ data, user });
  } catch (e) {
    req.session.alerts = ["Error al obtener usuarios"];
    return res.redirect("/login");
  }
};

const createUser = async (req, res) => {
  try {
    const userData = matchedData(req);
    const encryptedPassword = await encrypt(userData.password);

    // verificar si ya existe un usuario con la misma matrícula
    const existingUser = await usersModel.findOne({ matricula: userData.matricula });
    if (existingUser) {
      req.session.alerts = ["Ya existe un usuario con la misma matrícula"];
      return res.redirect("/admin/add-user");
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

    req.session.alerts = []; // limpiar los mensajes de alerta antes de enviar la respuesta
    res.redirect("/admin/users");
  } catch (e) {
    req.session.alerts = ["Error al crear usuario"]; // establecer un nuevo array de alertas con el mensaje de error
    return res.redirect("/admin/users");
  }
};

const editUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById({ _id: id });
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alerts = ["Error al intentar editar usuario"];
    return res.redirect("/admin/users");
  }
};

const getUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alerts = ["Error al intentar obtener el usuario"];
    return res.redirect("/admin/users");
  }
};

const deleteUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    await usersModel.deleteOne({ _id: id });
    req.session.alerts = ["Usuario eliminado correctamente"];
    res.redirect("/admin/users");
  } catch (e) {
    req.session.alerts = ["Error al intentar eliminar el usuario"];
    return res.redirect("/admin/users");
  }
};

const updateUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id, ...body } = requestData;
    console.log(id, body);
    const data = await usersModel.findOneAndUpdate({ _id: id }, body);
    console.log(data);
    res.redirect("/admin/users");
  } catch (e) {
    req.session.alerts = ["Error al intentar actualizar el usuario"];
    return res.redirect("/admin/users");
  }
};

const editProfile = async (req, res) => { // funcion para renderizar la vista de editar perfil
  try {
    const user = req.session.data.user;
    res.render("edit-profile", { user, main: false });
  } catch (e) {
    req.session.alerts = ["Error al intentar obtener usuarios"];
    return res.redirect("/files");
  }
};

const changePass = async (req, res) => {
  try{
    // logica para cambio de contraseña
    res.send("hola");
  } catch (e) {
    req.session.alerts = ["Error al intentar cambiar la contraseña"];
    return res.redirect("/files");
  }
}

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