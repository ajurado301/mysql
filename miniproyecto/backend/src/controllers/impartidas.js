// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones al endpoints de impartidas
// GET impartidas
const getImpartidas = (req, res) => {
    let teacher_id = req.query.id;
    let params = [];
    let sql;
    if (!teacher_id) {
        sql = "SELECT DISTINCT teacher.first_name, teacher.last_name, `subject`.title " +
              "FROM teacher JOIN subject_teacher ON teacher.teacher_id = subject_teacher.teacher_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "ORDER BY teacher.first_name, teacher.last_name, `subject`.title";
    }else {
        params.push(teacher_id)
        sql = "SELECT DISTINCT teacher.teacher_id, `subject`.title " +
              "FROM teacher JOIN subject_teacher ON teacher.teacher_id = subject_teacher.teacher_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "WHERE teacher.teacher_id = ? " +
              "ORDER BY `subject`.title ";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Asignaturas no encontradas para el profesor con id ${teacher_id}` };
            }else if (teacher_id) {
                respuesta = { ok: true, message: `Listado asignaturas para el profesor con id ${teacher_id}`, resultado: result};                
            }else {
                respuesta = { ok: true, message: `Listado asignaturas por profesor`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

module.exports = {
    getImpartidas
}