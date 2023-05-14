const bcryptjs = require("bcryptjs");

// contraseña sin encriptar
const encrypt = async ( textPlainPassword  ) => {
    return await bcryptjs.hash( textPlainPassword, 10);
}

// pasando contraseña sin y con encriptado
const compare = async ( textPlainPassword, hashPassword ) => {
    return await bcryptjs.compare( textPlainPassword, hashPassword);
}

module.exports = { compare, encrypt };