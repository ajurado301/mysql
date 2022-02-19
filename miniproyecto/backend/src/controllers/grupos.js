// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones a los endpoints de grupos
// GET
const getGrupo = (req, res) => {
    let group_id = req.query.id;
    let params = [];
    let sql;
    if (!group_id) {
        sql = "SELECT * FROM `group` ORDER BY name";
    }else {
        params.push(group_id)
        sql = "SELECT * FROM `group` WHERE group_id = ?";
    };
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Grupo con id ${group_id} no encontrado` };
            }else if (result.length == 1){
                respuesta = { ok: true, message: `Grupo con id ${group_id}`, resultado: result[0]};                
            }else {
                respuesta = { ok: true, message: `Listado grupos`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// POST
const postGrupo = (req, res) => {
    let params = [req.body.name];
    let sql = 'INSERT INTO `group` (name) VALUES (?)';
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Grupo con id ${result.insertId} agregado`, resultado: result.insertId};
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// PUT
const putGrupo = (req, res) => {
    let params = [req.body.name, req.body.id];
    let sql = "UPDATE `group` SET name = COALESCE(?, name) WHERE group_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Grupo con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Grupo con id ${req.body.id} modificado`};
            }
            return res.status(200).json(respuesta);
        }else {
            console.log(error)
            return res.status(400).json(error.message);
        }
    })
};

// DELETE
const deleteGrupo = (req, res) => {
    let params = [req.body.id];
    let sql = "DELETE FROM `group` WHERE group_id = ?";
    codenotchBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Grupo con id ${req.body.id} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Grupo con id ${req.body.id} eliminado`};
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
    getGrupo,
    postGrupo,
    putGrupo,
    deleteGrupo
}