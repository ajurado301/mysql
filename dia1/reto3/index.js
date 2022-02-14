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

// // Borrrar notas de más de 10 años
// let sql = "DELETE FROM `codenotch`.`mark` WHERE `date` < '2012-02-14';";
// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('DELETE correcto');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })    

// Poner un 5 a los alumnos con nota menor que 5
let sql = "UPDATE `codenotch`.`mark` SET `mark` = '5' WHERE mark < '5';";
codenotchDB.query(sql, (error, result) => {
    if (!error) {
        console.log('UPDATE correcto');
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

