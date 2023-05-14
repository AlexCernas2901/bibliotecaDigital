const { verify } = require("jsonwebtoken");
const { handdleHttpError } = require("../utils/handdleError");
const { verifyToken } = require("../utils/handdleJWT");
const { usersModel } = require("../models");

// sesion de usuarios
const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            handdleHttpError(res, "NO TOKEN EXISTS", 401);
            return
        }
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        if(!tokenData._id) {
            handdleHttpError(res, "NO ID EXISTS", 401);
            return
        }
        const user = await usersModel.findById(tokenData._id);
        req.user = user
        next();
    } catch (e) {
        handdleHttpError(res, "ERROR NO SESSION", 401);
    }
}

module.exports = authMiddleware;