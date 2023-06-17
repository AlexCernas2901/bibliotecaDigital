const { verify } = require("jsonwebtoken");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");

// middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {   
    if (!req.session.data || !req.session.data.token) {
      return handleHttpError(res, "Autenticación inválida", 401);
    }
    
    const tokenData = await verifyToken(req.session.data.token);
    
    if (!tokenData._id) {
      return handleHttpError(res, "Autenticación inválida", 401);
    }
    
    const id = tokenData._id;
    const user = await usersModel.findById(id);
    
    req.session.data.user = user;
    console.log('El usuario: ', user);
    
    next();
  } catch (error) {
    handleHttpError(res, "Error al obtener usuarios", 500);
  }
};

module.exports = authMiddleware;