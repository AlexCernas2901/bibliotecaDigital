const { handleHttpError } = require("../utils/handleError");

// controlador de panel de inicio de sesion
const login = (req, res) => {
  try {
    res.json("login");
  } catch (error) {
    handleHttpError(res, "Error al cargar la vista", 500);
  }
};

// controlador para cerrar sesion
const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        handleHttpError(res, "Error al intentar cerrar sesión", 500);
      } else {
        res.json("logout");
      }
    });
  } catch (error) {
    handleHttpError(res, "Error al intentar cerrar sesión", 500);
  }
};

module.exports = { 
  login, 
  logout 
};
