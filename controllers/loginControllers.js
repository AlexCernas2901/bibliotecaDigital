const login = (req, res) => {
  const alert = req.session.alert;
  res.render('login', { alert });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

module.exports = { 
  login, 
  logout 
};