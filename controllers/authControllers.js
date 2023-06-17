const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");
const sanitizeHtml = require("sanitize-html");
const { handleHttpError } = require("../utils/handleError");

// controlador para registrar un nuevo usuario
const registerController = async (req, res) => {
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

    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error al registrar usuario", 500);
  }
};

// controlador para login de usuarios
const loginController = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const user = await usersModel
      .findOne({ matricula: requestData.matricula })
      .select("name matricula password role");
    if (!user) {
      return handleHttpError(res, "Error datos incorrectos", 400);
    }

    const hashPassword = user.get("password");
    const check = await compare(requestData.password, hashPassword);

    if (!check) {
      return handleHttpError(res, "Error datos incorrectos", 400);
    }

    user.set("password", undefined, { strict: false });
    user.set("matricula", undefined, { strict: false });

    const data = {
      token: await signToken(user),
      userID: user._id,
    }

    req.session.data = data;
    console.log('data: ', data);
    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error usuario no existe", 500);
  }
};

module.exports = {
  loginController,
  registerController
};