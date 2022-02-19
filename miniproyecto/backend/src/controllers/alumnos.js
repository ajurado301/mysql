// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de alumnos
// GET
const getAlumno = (req, res) => {
    let student_id = req.query.id;
    let params = [];
    let sql;
    if (!student_id) {
        sql = "SELECT * FROM student ORDER BY first_name, last_name";
    }else {
        params.push(student_id)
        sql = "SELECT * FROM student WHERE student_id = ?";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Alumno con id ${student_id} no encontrado` };
            }else if (result.length == 1){
                respuesta = { ok: true, message: `Alumno con id ${student_id}`, resultado: result[0]};                
            }else {
                respuesta = { ok: true, message: `Listado alumnos`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// POST
const postAlumno = (req, res) => {
    let params = [req.body.first_name, req.body.last_name, req.body.group_id];
    let sql = 'INSERT INTO student (first_name, last_name, group_id) VALUES (?, ?, ?)';
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Alumno con id ${result.insertId} agregado`, resultado: result.insertId};
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// PUT
const putAlumno = (req, res) => {
    let params = [req.body.first_name, req.body.last_name, req.body.group_id, req.body.id];
    let sql = "UPDATE student SET first_name = COALESCE(?, first_name)," +
              "last_name = COALESCE(?, last_name), group_id = COALESCE(?, group_id)  WHERE student_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Alumno con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Alumno con id ${req.body.id} modificado`};
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// DELETE
const deleteAlumno = (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM student WHERE student_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Alumno con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Alumno con id ${req.body.id} eliminado`};
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
    getAlumno,
    postAlumno,
    putAlumno,
    deleteAlumno
}