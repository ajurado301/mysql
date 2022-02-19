// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de notas
// GET
const getNota = (req, res) => {
    let params = [req.query.id];
    let sql = "SELECT * FROM mark WHERE student_id = ? ORDER BY date";

    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `No se encontraron notas para el alumno con id ${req.query.id}` };
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
                respuesta = { ok: false, message: `Nota con id ${req.body.id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Nota con id ${req.body.id} modificada`};
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
                respuesta = { ok: false, message: `Nota con id ${req.body.id} no encontrada`};
            }else {
                respuesta = { ok: true, message: `Nota con id ${req.body.id} eliminada`};
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
    postNota,
    putNota,
    deleteNota
}