const { matchedData } = require("express-validator");
const { encrypt, compare} = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

// declarando controlador para registrar un usuario
const registerController = async (req, res) => {
    try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const userData = await usersModel.create(body);
    userData.set("password", undefined, { strict:false });

    const data = {
        token: await signToken(userData),
        user: userData
    }
    res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR REGISTER USER");
    }
}

// declarando controlador para login de usuarios
const loginController = async (req, res) => {
    try {
      const requestData = matchedData(req);
      const user = await usersModel
        .findOne({ matricula: requestData.matricula })
        .select("name matricula password role");
      if (!user) {
        handleHttpError(res, "USER NO EXISTS", 404);
        return;
      }
      const hashPassword = user.get("password");
      const check = await compare(requestData.password, hashPassword);
      if (!check) {
        handleHttpError(res, "INVALID PASSWORD", 401);
        return;
      }
      user.set("password", undefined, { strict: false });
      const data = {
        token: await signToken(user),
        user,
      };
      console.log(req.session);
      req.session.data = data;
      res.redirect("/files");
    } catch (e) {
      console.error("ERROR REGISTER USER:", e);
      handleHttpError(res, "ERROR REGISTER USER");
    }
  };

module.exports = { 
  loginController, 
  registerController 
};
