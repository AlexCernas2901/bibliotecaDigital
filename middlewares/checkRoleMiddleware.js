const { handdleHttpError } = require("../utils/handdleError");

// declarando funcion para validar permisos de usuario
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRole = roles.some((rolSingle) => {
            rolesByUser.includes(rolSingle)
        });
        if(!checkValueRole) {
            handdleHttpError(res, "NO VALID USER PERMISSIONS", 403);
            return;
        }
        next()
    } catch (e) {
        handdleHttpError(res, "NEED PERMISSIONS", 403);
    }
}

module.exports = checkRol;