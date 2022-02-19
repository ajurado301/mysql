// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones al endpoints de apuntadas
// GET apuntadas
const getApuntadas = (req, res) => {
    let student_id = req.query.id;
    let params = [];
    let sql;
    if (!student_id) {
        sql = "SELECT student.first_name, student.last_name, `subject`.title " + 
              "FROM student JOIN `group` ON student.group_id = `group`.group_id " +
              "JOIN subject_teacher ON `group`.group_id = subject_teacher.group_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "ORDER BY first_name, last_name, `subject`.title";
    }else {
        params.push(student_id)
        sql = "SELECT student.student_id, `subject`.title " + 
              "FROM student JOIN `group` ON student.group_id = `group`.group_id " +
              "JOIN subject_teacher ON `group`.group_id = subject_teacher.group_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "WHERE student.student_id = ? " +
              "ORDER BY `subject`.title";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Asignaturas no encontradas para el alumno con id ${student_id}` };
            }else if (student_id) {
                respuesta = { ok: true, message: `Listado asignaturas para el alumno con id ${student_id}`, resultado: result};                
            }else {
                respuesta = { ok: true, message: `Listado asignaturas por alumno`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

module.exports = {
    getApuntadas
}