const login = (req, res) => {
  const alerts = req.session.alerts || [];
  delete req.session.alerts; // eliminar las alertas después de mostrarlas
  res.render("login", { alerts });
};

const logout = (req, res) => { // cerrar session
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

module.exports = { 
  login, 
  logout 
};