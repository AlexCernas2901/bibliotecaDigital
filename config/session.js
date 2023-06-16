const session = require("express-session");

// sesion del usuario
const userSession = session({
  secret: "230fk0SDF0390i3r",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
});

module.exports = userSession;