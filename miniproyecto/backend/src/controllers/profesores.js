// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de profesores
// GET
const getProfesor = (req, res) => {
    let teacher_id = req.query.id;
    let params = [];
    let sql;
    if (!teacher_id) {
        sql = "SELECT * FROM teacher ORDER BY first_name, last_name";
    }else {
        params.push(teacher_id)
        sql = "SELECT * FROM teacher WHERE teacher_id = ?";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Profesor con id ${teacher_id} no encontrado` };
            }else if (result.length == 1){
                respuesta = { ok: true, message: `Profesor con id ${teacher_id}`, resultado: result[0]};                
            }else {
                respuesta = { ok: true, message: `Listado profesores`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// POST
const postProfesor = (req, res) => {
    let params = [req.body.first_name, req.body.last_name];
    let sql = 'INSERT INTO teacher (first_name, last_name) VALUES (?, ?)';
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Profesor con id ${result.insertId} agregado`, resultado: result.insertId};
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// PUT
const putProfesor = (req, res) => {
    let params = [req.body.first_name, req.body.last_name, req.body.id];
    let sql = "UPDATE teacher SET first_name = COALESCE(?, first_name)," +
              "last_name = COALESCE(?, last_name) WHERE teacher_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Profesor con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Profesor con id ${req.body.id} modificado`};
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// DELETE
const deleteProfesor = (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM teacher WHERE teacher_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Profesor con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Profesor con id ${req.body.id} eliminado`};
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
    getProfesor,
    postProfesor,
    putProfesor,
    deleteProfesor
}