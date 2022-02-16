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

// // Obtén los nombres y apellidos de los alumnos y los nombres de las asignaturas en las que están apuntados.
// let params = [];
// let sql = "SELECT CONCAT(student.first_name, ' ', student.last_name) AS estudiante, `subject`.title AS asignatura FROM mark JOIN student ON mark.student_id = student.student_id JOIN `subject` ON mark.subject_id = `subject`.subject_id ORDER BY estudiante"

// codenotchDB.query(sql, params, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// // Obtén todos los nombres y apellidos de los profesores y los nombres de las asignaturas que imparten.
// let params = [];
// let sql = "SELECT CONCAT(teacher.first_name, ' ', teacher.last_name) as profesor, `subject`.title AS asignatura FROM teacher JOIN subject_teacher ON teacher.teacher_id = subject_teacher.teacher_id JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id ORDER BY profesor"

// codenotchDB.query(sql, params, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// Obtén el número total de alumnos por asignatura, el nombre de la asignatura y el nombre y apellidos del profesor que la imparte.
let params = [];
let sql = "SELECT `subject`.title as asignatura, COUNT(student_id) AS num_alumnos, CONCAT(teacher.first_name, ' ', teacher.last_name) AS profesor FROM mark JOIN `subject` ON mark.subject_id = `subject`.subject_id JOIN subject_teacher ON `subject`.subject_id = subject_teacher.subject_id JOIN teacher ON subject_teacher.teacher_id = teacher.teacher_id GROUP BY asignatura ORDER BY asignatura"

codenotchDB.query(sql, params, (error, result) => {
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