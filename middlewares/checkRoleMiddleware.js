// declarando funcion para validar permisos de usuario
// const { handdleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => { // Declarando función para validar permisos de usuario
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRole = roles.some((rolSingle) => {
            return rolesByUser.includes(rolSingle);
        });
        if (!checkValueRole) {
            req.session.alert = "Permisos invalidos";
            return res.redirect("/login");
        }
        next();
    } catch (e) {
        req.session.alert = "No tienes permisos";
        return res.redirect("/login");
    }
};

module.exports = checkRol;

module.exports = checkRol;