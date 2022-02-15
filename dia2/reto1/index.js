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

// // calcular la nota media de los alumnos de la asignatura 1
// let sql = "SELECT subject_id, AVG(mark) FROM codenotch.mark WHERE subject_id = 1;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// // Calcular el número total de alumnos que hay en el bootcamp
// let sql = "SELECT COUNT(*) AS total_alumnos FROM codenotch.student;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// // Calcular el número total de alumnos que hay en el bootcamp
// let sql = "SELECT * FROM `codenotch`.`group`;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// // Elimina todas las notas de la base de datos que estén por encima de 5 y que sean del año pasado (no utilices BETWEEN).
// let sql = "DELETE FROM codenotch.mark WHERE mark > 5 AND (`date` >= '2021-01-01' AND `date` <= '2021-12-31');"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// // Obtén los datos de todos los estudiantes que estén en el bootcamp este año. Para ello la tabla de estudiantes debe tener un campo que sea el año de ingreso.
// let sql = "SELECT * FROM codenotch.student WHERE entry_year = 2022;"

// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// Calcular el número de profesores que hay por cada asignatura.
let sql = "SELECT subject_id, COUNT(teacher_id) AS num_teachers FROM subject_teacher GROUP BY subject_id;"

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