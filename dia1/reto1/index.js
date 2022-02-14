// Importar MySQL
const mysql = require('mysql2')

// Crear conexión a mysql
const codenotchDB = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Codenotch#2022',
        database: 'codenotch'
    }
)

// Peticiones query a la bbdd
// let sql = "ALTER TABLE `codenotch`.`asignatura` ADD COLUMN `duracion` INT NULL AFTER `dia`;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Columna "duracion" agregada en tabla "asignatura"');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// let sql = "ALTER TABLE `codenotch`.`profesor` DROP COLUMN `telefono`;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Columna "telefono" eliminada de la tabla "profesor"');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

let sql = "DROP TABLE `codenotch`.`profesor`;"

codenotchDB.query(sql, (error, result) => {
    if (!error) {
        console.log('tabla "profesor" eliminada de la bbdd');
        console.log(result);
    }else (
        console.log(error)
    )
})

// Conectar a la base de datos codenotch
codenotchDB.connect((error) => {
    if (!error) {
        console.log('Conectado a la bbdd codenotch')
    }else {
        console.log(error)
    }
})