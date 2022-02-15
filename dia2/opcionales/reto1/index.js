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

// Obtén los nombres de los alumnos y la cantidad total de asignaturas por alumno que sean HTML o TypeScript y cuyo profesor sea Jose o algún compañero que elijáis.
let sql = "SELECT student.first_name AS alumno, COUNT(mark.subject_id) AS total_asignaturas FROM mark JOIN student ON mark.student_id = student.student_id JOIN `subject` ON mark.subject_id = `subject`.subject_id JOIN subject_teacher ON `subject`.subject_id = subject_teacher.subject_id JOIN teacher ON subject_teacher.teacher_id = teacher.teacher_id WHERE (LOWER(`subject`.title) = 'html' OR LOWER(`subject`.title) = 'typescript') AND (LOWER(teacher.first_name) = 'jose' OR LOWER(teacher.first_name) = 'rubén') GROUP BY student.first_name;"

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