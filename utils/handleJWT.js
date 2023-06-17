const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { handleHttpError } = require("../utils/handleError");

// función para firmar un token
const signToken = async (user) => {
  // firmando el token
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

// función para verificar un token
const verifyToken = async (tokenJWT) => {
  // verificar el token
  try {
    return jwt.verify(tokenJWT, JWT_SECRET);
  } catch (error) {
    handleHttpError(res, "Error al verificar el token", 500); 
  }
};

module.exports = { 
    verifyToken, 
    signToken 
};
