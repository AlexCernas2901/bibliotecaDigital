const { verify } = require("jsonwebtoken");
const { handdleHttpError } = require("../utils/handdleError");
const { verifyToken } = require("../utils/handdleJWT");
const { usersModel } = require("../models");

// sesion de usuarios
const authMiddleware = async (req, res, next) => {
    try {
        if (!req.session.data || !req.session.data.token) {
            handdleHttpError(res, "NO TOKEN EXISTS", 401);
            return;
        }
        
        const tokenData = await verifyToken(req.session.data.token);
        
        if (!tokenData._id) {
            handdleHttpError(res, "NO ID EXISTS", 401);
            return;
        }
        
        const user = await usersModel.findById(tokenData._id);
        req.user = user;
        next();
    } catch (e) {
        handdleHttpError(res, "ERROR NO SESSION", 401);
    }
};

module.exports = authMiddleware;