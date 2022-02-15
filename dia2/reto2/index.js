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

// // Obtén el id y la nota de los alumnos que tengan un id entre 1 y 20, o que tenga una nota mayor de 8 y la nota tenga fecha del año pasado.
// let sql = "SELECT student_id, mark FROM mark WHERE (student_id BETWEEN 1 AND 20) OR (mark > 8 AND `date` BETWEEN '2021-01-01' AND '2021-12-31');"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// Obtén la media de las notas que se han dado en el último año por asignatura.
let sql = "SELECT student_id, AVG(mark) AS nota_media FROM codenotch.mark WHERE `date` BETWEEN '2021-01-01' AND '2021-12-31' GROUP BY student_id;"

codenotchDB.query(sql, (error, result) => {
    if (!error) {
        console.log('Operación correcta');
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