const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");
const sanitizeHtml = require("sanitize-html");
const { handleHttpError } = require("../utils/handleError");

// controlador para obtener usuarios
const getUsers = async (req, res) => {
  try {
    const user = req.session.data.user;
    const data = await usersModel.find({});
    console.log(data);
    res.json({ data, user });
  } catch (error) {
    handleHttpError(res, "Error al obtener usuarios", 500);
  }
};

// controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    const userData = matchedData(req);
    const encryptedPassword = await encrypt(userData.password);

    // verificar si ya existe un usuario con la misma matrícula
    const existingUser = await usersModel.findOne({ matricula: userData.matricula });
    if (existingUser) {
      return handleHttpError(res, "Error matricula en uso", 400);
    }

    const savedUser = await usersModel.create({
      name: sanitizeHtml(userData.name),
      matricula: sanitizeHtml(userData.matricula),
      password: encryptedPassword,
      role: sanitizeHtml(userData.role),
    });

    const responseData = {
      token: await signToken(savedUser),
      user: savedUser,
    };

    console.log(responseData);
    res.redirect("/admin/users");
  } catch (error) {
    handleHttpError(res, "Error al crear usuario", 500);
  }
};

// controlador para editar un usuario
const editUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById({ _id: id });
    console.log(data);
    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error al editar usuario", 500);
  }
};

// controlador para obtener un usuario
const getUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    const data = await usersModel.findById(id);
    console.log(data);
    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error al buscar usuario", 500);
  }
};

// controlador para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id } = requestData;
    await usersModel.deleteOne({ _id: id });
    res.redirect("/admin/users");
  } catch (error) {
    handleHttpError(res, "Error al eliminar usuario", 500);
  }
};

// controlador para actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { id, ...body } = requestData;
    console.log(id, body);
    const data = await usersModel.findOneAndUpdate({ _id: id }, body);
    console.log(data);
    res.redirect("/admin/users");
  } catch (error) {
    handleHttpError(res, "Error al actualizar usuario", 500);
  }
};

// controlador para editar el perfil de usuario
const editProfile = async (req, res) => {
  try {
    const user = req.session.data.user;
    res.json({ user });
  } catch (error) {
    handleHttpError(res, "Error vista editProfile", 500);
  }
};

// controlador para cambiar la contraseña
const changePass = async (req, res) => {
  try {
    const user = req.session.data.user;
    const requestData = matchedData(req);
    const { currentPass, newPass, confirmPass } = requestData;

    if (newPass == confirmPass) {
      // buscar el usuario en la base de datos
      const userObj = await usersModel.findById(user._id).select("+password");
      if (userObj) {
        // verificar la contraseña actual utilizando un método de hashing
        const isCurrentPassValid = await compare(currentPass, userObj.password);
        if (isCurrentPassValid) {
          // generar un nuevo hash de la nueva contraseña
          const newPassHash = await encrypt(newPass);

          // actualizar la contraseña en la base de datos
          await usersModel.findOneAndUpdate({ _id: user._id }, { password: newPassHash });

          user.set("password", undefined, { strict: false });
          user.set("matricula", undefined, { strict: false });

          res.json({ user, newPass });
          return
        }
      }
    }

    // si la validación falla o no se cumplen las condiciones, devolver un error
    handleHttpError(res, "No se pudo cambiar la contraseña. Verifica tus datos.", 400);
  } catch (error) {
    handleHttpError(res, "Error al actualizar la contraseña", 500);
  }
};


module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  editUser,
  createUser,
  editProfile,
  changePass
};
