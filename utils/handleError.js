// manejador de errores para el try y catch (solo para pruebas en postman)
const handleHttpError = (res, message = "SOMETHING HAPPENED", code = 403) => {
    res.status(code).json({ error: message });
};

module.exports = { 
  handleHttpError 
};