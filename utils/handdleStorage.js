const multer = require("multer");

// uso de multer para manipular archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function(req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const originalname = file.originalname.replace(`.${ext}`, ""); // eliminar extensión duplicada
        const filename = `${originalname}-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;