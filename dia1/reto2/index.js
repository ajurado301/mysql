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

// // json provisional para hacer los 10 INSERT de mark
// let marks = [
//     { student_id: '1', subject_id: '5', date: '2022-01-18', mark: '6' },
//     { student_id: '3', subject_id: '1', date: '2021-11-23', mark: '7' },
//     { student_id: '7', subject_id: '5', date: '2010-02-12', mark: '8' },
//     { student_id: '5', subject_id: '3', date: '2017-05-01', mark: '5' },
//     { student_id: '8', subject_id: '7', date: '2009-09-25', mark: '4' },
//     { student_id: '10', subject_id: '2', date: '2013-10-09', mark: '9' },
//     { student_id: '2', subject_id: '9', date: '2015-04-25', mark: '6' },
//     { student_id: '1', subject_id: '8', date: '2018-03-30', mark: '7' },
//     { student_id: '3', subject_id: '5', date: '2020-06-27', mark: '8' },
//     { student_id: '9', subject_id: '1', date: '2005-11-30', mark: '3' },
// ]

// // Peticiones query a la bbdd
// marks.forEach((mark) => {
//     let sql = "INSERT INTO `codenotch`.`mark` (`student_id`, `subject_id`, `date`, `mark`) VALUES ('" + mark.student_id + "', '" + mark.subject_id + "', '" + mark.date + "', '" + mark.mark + "');";
//     codenotchDB.query(sql, (error, result) => {
//         if (!error) {
//             console.log('INSERT correcto');
//             console.log(result);
//         }else (
//             console.log(error)
//         )
//     })    
// })

// // Setear todas las notas de los estudiantes a 0
// let sql = "UPDATE `mark` SET `mark` = '0';";
// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('UPDATE correcto');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })    

// // Obtener nombre y apellido de todos los estudiantes
// let sql = "SELECT `first_name`, `last_name` FROM `codenotch`.`student`;";
// codenotchDB.query(sql, (error, result) => {
//     if (!error) {
//         console.log('SELECT correcto');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })    

// Obtener todos los datos de los profesores
let sql = "SELECT * FROM `codenotch`.`teacher`;";
codenotchDB.query(sql, (error, result) => {
    if (!error) {
        console.log('SELECT correcto');
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

