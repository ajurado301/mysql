// Datos cadena conexión MySQL
const host = 'localhost';
const user = 'root';
const pass = 'Codenotch#2022';
const bbdd = 'codenotch';

// Importaciones
const mysql = require('mysql2');

const cadenaConexion = {
    host: host,
    user: user,
    password: pass,
    database: bbdd
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