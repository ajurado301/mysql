// Conexión codenotchBBDD
const { codenotchBBDD } = require('../bbdd');

// Controladores para las peticiones al endpoints de media
// GET media
const getMedia = (req, res) => {
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

module.exports = {
    getMedia
}