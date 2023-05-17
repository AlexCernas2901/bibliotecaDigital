const login = (req, res) => {
  res.render("login");
};


const logout = (req, res) => {
      req.session.destroy((err) => {
        res.redirect("/login");
        console.log("SESSION CLOSED");
      });
};

module.exports = { login, logout }