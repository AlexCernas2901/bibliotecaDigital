// const { verify } = require("jsonwebtoken");
// const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");

// sesion de usuarios
const authMiddleware = async (req, res, next) => {
    try {
        if (!req.session.data || !req.session.data.token) {
            req.session.alert = "El token no existe";
            return res.redirect("/login");
        }
        
        const tokenData = await verifyToken(req.session.data.token);
        
        if (!tokenData._id) {
            req.session.alert = "El ID no existe";
            return res.redirect("/login");
        }
        
        const user = await usersModel.findById(tokenData._id);
        req.user = user;
        next();
    } catch (e) {
        req.session.alert = "La session no existe";
        res.redirect("/login");
    }
};

module.exports = authMiddleware;