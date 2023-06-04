const bcryptjs = require("bcryptjs");

const encrypt = async ( textPlainPassword  ) => { // contraseña sin encriptar
    return await bcryptjs.hash( textPlainPassword, 10);
}

const compare = async ( textPlainPassword, hashPassword ) => { // pasando contraseña sin y con encriptado
    return await bcryptjs.compare( textPlainPassword, hashPassword);
}

module.exports = { compare, encrypt };