// controlador de panel de inicio de sesion
const login = (req, res) => {
  res.json("login")
};

// controlador para cerrar sesion (falta eliminar el token)
const logout = (req, res) => {
  req.session.destroy((err) => {
    res.json("logout");
  });
};

module.exports = { 
  login, 
  logout 
};