const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");
const sanitizeHtml = require("sanitize-html");

const registerController = async (req, res) => { // declarando controlador para registrar un usuario
  try {
    req = matchedData(req);
    let { name, matricula, password } = req;
    name = sanitizeHtml(name);
    matricula = sanitizeHtml(matricula);
    password = sanitizeHtml(password);

    const encryptedPassword = await encrypt(password);
    const body = { ...req, password: encryptedPassword };

    const userData = await usersModel.create(body);
    userData.set("password", undefined, { strict: false });

    const data = {
      token: await signToken(userData),
      user: userData,
    };

    req.session.alerts = []; // Limpiar los mensajes de alerta antes de enviar la respuesta
    res.send({ data });
  } catch (e) {
    req.session.alerts = ["Error al intentar registrar un usuario"]; // Establecer un nuevo array de alertas con el mensaje de error
    return res.redirect("/files");
  }
};

const loginController = async (req, res) => { // declarando controlador para login de usuarios
  try {
    req.session.alerts = []; // Limpiar los mensajes de alerta antes de cada inicio de sesión

    const requestData = matchedData(req);
    let { matricula, password } = requestData;
    matricula = sanitizeHtml(matricula);
    password = sanitizeHtml(password);
    const user = await usersModel
      .findOne({ matricula: requestData.matricula })
      .select("name matricula password role");
    if (!user) {
      req.session.alerts.push("Matricula o contraseña incorrecta");
      return res.redirect("/login");
    }

    const hashPassword = user.password;
    const check = await compare(requestData.password, hashPassword);

    if (!check) {
      req.session.alerts.push("Matricula o contraseña incorrecta");
      return res.redirect("/login");
    }
    delete user.password; // elimina la propiedad 'password' del objeto user

    const data = {
      token: await signToken(user),
      user,
    };
    
    req.session.data = data;
    res.redirect("/files");
  } catch (e) {
    req.session.alerts.push("Error al iniciar sesión");
    return res.redirect("/login");
  }
};

module.exports = {
  loginController,
  registerController
};