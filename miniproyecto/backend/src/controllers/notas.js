// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de notas
// GET
const getNota = (req, res) => {
    let params = [req.query.id];
    let sql = "SELECT * FROM mark WHERE student_id = ? ORDER BY mark DESC";

    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Alumno con id ${req.query.id} no encontrado` };
            }else{
                respuesta = { ok: true, message: `Listado notas para el alumno con id ${req.query.id}`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};
// GET media
const getNotaMedia = (req, res) => {
    let params = [req.query.id];
    let sql = "SELECT student_id, AVG(mark) AS nota_media FROM mark WHERE student_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            if (!result[0].nota_media){
                respuesta = { ok: false, message: `Alumno con id ${req.query.id} no encontrado` };
            }else{
                respuesta = { ok: true, message: `Media de las notas para el alumno con id ${req.query.id}`, resultado: result[0]};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};
// GET apuntadas
const getNotaApuntada = (req, res) => {
    let student_id = req.query.id;
    let params = [];
    let sql;
    if (!student_id) {
        sql = "SELECT student.first_name, student.last_name, `subject`.title " + 
              "FROM student JOIN `group` ON student.group_id = `group`.group_id " +
              "JOIN subject_teacher ON `group`.group_id = subject_teacher.group_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "ORDER BY first_name, last_name";
    }else {
        params.push(student_id)
        sql = "SELECT student.student_id, `subject`.title " + 
              "FROM student JOIN `group` ON student.group_id = `group`.group_id " +
              "JOIN subject_teacher ON `group`.group_id = subject_teacher.group_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "WHERE student.student_id = ?";
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
// GET impartidas
const getNotaImpartida = (req, res) => {
    let teacher_id = req.query.id;
    let params = [];
    let sql;
    if (!teacher_id) {
        sql = "SELECT DISTINCT teacher.first_name, teacher.last_name, `subject`.title " +
              "FROM teacher JOIN subject_teacher ON teacher.teacher_id = subject_teacher.teacher_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id";
    }else {
        params.push(teacher_id)
        sql = "SELECT DISTINCT teacher.teacher_id, `subject`.title " +
              "FROM teacher JOIN subject_teacher ON teacher.teacher_id = subject_teacher.teacher_id " +
              "JOIN `subject` ON subject_teacher.subject_id = `subject`.subject_id " +
              "WHERE teacher.teacher_id = ?";
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

// POST
const postNota = (req, res) => {
    let params = [req.body.student_id, req.body.subject_id, req.body.date, req.body.mark];
    let sql = 'INSERT INTO mark (student_id, subject_id, date, mark) VALUES (?, ?, ?, ?)';
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Nota con id ${result.insertId} agregada`, resultado: result.insertId};
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// PUT
const putNota = (req, res) => {
    let params = [req.body.student_id, req.body.subject_id, req.body.date, req.body.mark, req.body.id];
    let sql = "UPDATE mark SET student_id = COALESCE(?, student_id), subject_id = COALESCE(?, subject_id)," +
              "date = COALESCE(?, date), mark = COALESCE(?, mark) WHERE mark_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Nota con id ${req.body.mark_id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Nota con id ${req.body.mark_id} modificada`};
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// DELETE
const deleteNota = (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM mark WHERE mark_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Nota con id ${req.body.mark_id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Nota con id ${req.body.mark_id} eliminada`};
            }
            return res.status(200).json(respuesta);            
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// Exportar controladores
module.exports = {
    getNota,
    getNotaMedia,
    getNotaApuntada,
    getNotaImpartida,
    postNota,
    putNota,
    deleteNota
}