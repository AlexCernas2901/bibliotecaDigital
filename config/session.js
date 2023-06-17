const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;

// sesion del usuario
const userSession = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // duración de la sesión en milisegundos
  }
});

module.exports = userSession;