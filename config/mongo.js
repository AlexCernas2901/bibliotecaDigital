const mongoose = require("mongoose");

// conexion a la base de datos
const dbConnect = () => {
    const DB_URI = process.env.DB_URI // pidiendo la URI de la base de datos
    mongoose.connect(
        DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("CONNECTION SUCCESSFULLY");
    });
};

//exportando el modulo para usarlo en otros archivos
module.exports = dbConnect;