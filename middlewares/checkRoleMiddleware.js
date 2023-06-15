const checkRol = (roles) => (req, res, next) => { // declarando función para validar permisos de usuario
    try {
        req.session.alerts = []; // limpiar los mensajes de alerta antes de enviar la respuesta
        const rolesByUser = req.session.data.user.role;
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