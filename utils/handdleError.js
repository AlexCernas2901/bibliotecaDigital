// manejador de errores para el try y catch
const handdleHttpError = (res, message = "SOMETHING HAPPENED", code = 403) => {
    res.status(code).json({ error: message });
};

module.exports = { handdleHttpError };