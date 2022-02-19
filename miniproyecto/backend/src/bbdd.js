// Importaciones
const mysql = require('mysql2');

const cadenaConexion = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_BBDD
}
// Crear Conexión y conectar con BBDD codenotch mysql
const codenotchBBDD = mysql.createConnection(cadenaConexion);

codenotchBBDD.connect((error) => {
    if (!error) {
        console.log('Conectado a BBDD codenotch')
    }else {
        console.log(error);
    }
});

module.exports = {
    codenotchBBDD
}