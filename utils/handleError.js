// manejador de errores para el try y catch zz
const handleHttpError = (res, message = "SOMETHING HAPPENED", code = 403) => {
    res.status(code).json({ error: message });
};

module.exports = { 
  handleHttpError 
};