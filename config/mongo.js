const mongoose = require("mongoose");

// conexion remota a base de datos
const dbConnect = () => {// conexion a la base de datos
    const DB_URI = process.env.DB_URI // pidiendo la URI de la base de datos
    mongoose.connect(
        DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        console.log("CONNECTION SUCCESSFULLY");
    });
};

// conexion local a la base de datos
// const dbConnect = async () => { 
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/bibliotecaDigital');
//   } catch (error) {
//     console.log("Error al conectar la base de datos", error);
//   }
// };

module.exports = dbConnect; 
