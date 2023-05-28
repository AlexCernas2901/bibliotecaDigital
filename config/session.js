const session = require("express-session");

const userSession = session({
  secret: "230fk0SDF0390i3r",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // duración de la sesión en milisegundos
  }
});

module.exports = userSession;