const { matchedData } = require("express-validator");
const { encrypt, compare} = require("../utils/handdlePassword");
const { signToken } = require("../utils/handdleJWT");
const { usersModel } = require("../models");
const { handdleHttpError } = require("../utils/handdleError");

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
        handdleHttpError(res, "ERROR REGISTER USER");
    }
}

// declarando controlador para login de usuarios
const loginController = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ matricula:req.matricula })
        .select("name matricula password role");
        if (!user) {
            handdleHttpError(res, "USER NO EXISTS", 404);
            return;
        }
        const hashPassword = user.get("password");
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handdleHttpError(res, "INVALID PASSWORD", 401);
            return;
        }
        user.set("password", undefined, { strict:false });
        const data = {
            token: await signToken(user),
            user
        };
        res.send({ data });
    } catch (e) {
        handdleHttpError(res, "ERROR REGISTER USER");
    }
};

module.exports = { 
    loginController, 
    registerController 
};
