const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJWT");

const getUsers = async (req, res) => { // declarando controlador para obtener usuarios
  try {
    const user = req.user;
    const data = await usersModel.find({});
    console.log(data);
    res.send({ data, user });
  } catch (e) {
    req.session.alert = "Error al obtener usuarios";
    return res.redirect("/login");
  }
};

const createUser = async (req, res) => { // declarando controlador para crear un usuario
  try {
    const userData = matchedData(req);
    const encryptedPassword = await encrypt(userData.password);

    const savedUser = await usersModel.create({
      name: userData.name,
      matricula: userData.matricula,
      password: encryptedPassword,
      role: userData.role,
    });

    const responseData = {
      token: await signToken(savedUser),
      user: savedUser,
    };

    console.log(responseData);

    res.redirect("/admin/users");
  } catch (e) {
    req.session.alert = "Error al crear usuario";
    return res.redirect("/admin/users");
  }
};
const editUser = async (req, res) => { // declarando controlador para editar usuario
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await usersModel.findById({ _id: id });
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alert = "Error al intentar editar usuario";
    return res.redirect("/admin/users");
  }
};

const getUser = async (req, res) => { // declarando controlador para obtener usuario por ID
  try {
    const { id } = matchedData(req);
    const data = await usersModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alert = "Error al intentar obtener el usuario";
    return res.redirect("/admin/users");
  }
};

const deleteUser = async (req, res) => { // declarando controlador para eliminar un usuario por ID
  try {
    const { id } = matchedData(req);
    await usersModel.deleteOne({ _id: id });
    req.session.alert = "Usuario eliminado correctamente";
    res.redirect("/admin/users");
  } catch (e) {
    req.session.alert = "Error al intentar elimiar el usuario";
    return res.redirect("/admin/users");
  }
};

const updateUser = async (req, res) => { // declarando controlador para actualizar un usuario
  try {
    const { id, ...body } = matchedData(req);
    // if (body.password) {
    //   body.password = await encrypt(body.password);
    // }
    console.log(id, body);
    const data = await usersModel.findOneAndUpdate({ _id: id }, body);
    console.log(data);
    // const updatedUser = await usersModel.findById(data._id).select("name matricula password role");
    // updatedUser.set("password", undefined, { strict: false });
    res.redirect("/admin/users");
  } catch (e) {
    req.session.alert = "Error al intentar actualizar el usuario";
    return res.redirect("/admin/users");
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  editUser,
  createUser
};