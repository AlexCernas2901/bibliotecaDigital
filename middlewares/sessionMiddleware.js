// const { verify } = require("jsonwebtoken");
// const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");

// sesion de usuarios
const  authMiddleware = async (req, res, next) => {
    try {
        req.session.alerts = []; // limpiar los mensajes de alerta antes de enviar la respuesta
        if (!req.session.data || !req.session.data.token) {
            req.session.alert = "El token no existe";
            return res.redirect("/files");
        }
        const tokenData = await verifyToken(req.session.data.token);

        if (!tokenData._id) {
            req.session.alert = "El ID no existe";
            return res.redirect("/files");
        }
        const id = tokenData._id
        const user = await usersModel.findById(id);
        
        req.session.data.user = user;
        console.log('el usuadio: ', user)
        next();
    } catch (e) {
        req.session.alert = "La session no existe";
        res.redirect("/files");
    }
};

module.exports = authMiddleware;