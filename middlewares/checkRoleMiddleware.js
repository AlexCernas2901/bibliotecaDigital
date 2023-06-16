const { handleHttpError } = require("../utils/handleError");

// middleware para checar el rol de usiario 
const checkRol = (roles) => (req, res, next) => {
  try {
    const rolesByUser = req.session.data.user.role;
    const checkValueRole = roles.some((rolSingle) => {
      return rolesByUser.includes(rolSingle);
    });
    if (!checkValueRole) {
      return handleHttpError(res, "Permiso denegado", 403);
    }
    next();
  } catch (e) {
    return handleHttpError(res, "Error al obtener usuarios", 500);
  }
};

module.exports = checkRol;