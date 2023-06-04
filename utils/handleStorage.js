const multer = require("multer");

const storage = multer.diskStorage({ // uso de multer para manipular archivos
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