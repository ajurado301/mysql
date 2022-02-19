// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de asignaturas
// GET
const getAsignatura = (req, res) => {
    let subject_id = req.query.id;
    let params = [];
    let sql;
    if (!subject_id) {
        sql = "SELECT * FROM `subject` ORDER BY title";
    }else {
        params.push(subject_id)
        sql = "SELECT * FROM `subject` WHERE subject_id = ?";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Asignatura con id ${subject_id} no encontrada` };
            }else if (result.length == 1){
                respuesta = { ok: true, message: `Asignatura con id ${subject_id}`, resultado: result[0]};                
            }else {
                respuesta = { ok: true, message: `Listado asignaturas`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// POST
const postAsignatura = (req, res) => {
    let params = [req.body.title];
    let sql = 'INSERT INTO `subject` (title) VALUES (?)';
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Asignatura con id ${result.insertId} agregada`, resultado: result.insertId};
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// PUT
const putAsignatura = (req, res) => {
    let params = [req.body.title, req.body.id];
    let sql = "UPDATE `subject` SET title = COALESCE(?, title) WHERE subject_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Asignatura con id ${req.body.id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Asignatura con id ${req.body.id} modificada`};
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// DELETE
const deleteAsignatura = (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM `subject` WHERE subject_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Asignatura con id ${req.body.id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Asignatura con id ${req.body.id} eliminada`};
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
    getAsignatura,
    postAsignatura,
    putAsignatura,
    deleteAsignatura
}