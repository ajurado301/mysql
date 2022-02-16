// Importar MySQL
const mysql = require('mysql2')

// Crear conexión a mysql
const codenotchDB = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Codenotch#2022',
        database: 'museo'
    }
)


// // Obtener un listado de todos los objetos que el museo tiene en préstamo, su localización dentro de la exposición, la fecha de expiración de este, la información básica (nombre, apellidos y email) de la persona que los ha prestado.
// let params = ["3"];
// let sql = "SELECT pieza.nombre AS pieza, pieza.ubicacion, prestamo.fecha_fin AS fecha_devolucion, propietario.nombre AS propietario_nombre, propietario.direccion AS propietario_direccion, propietario.email AS propietario_email FROM pieza JOIN prestamo ON pieza.prestamo_id = prestamo.prestamo_id JOIN propietario ON pieza.propietario_id = propietario.propietario_id WHERE prestamo.estado = ? ORDER BY fecha_devolucion"

// codenotchDB.query(sql, params, (error, result) => {
//     if (!error) {
//         console.log('Operación correcta');
//         console.log(result);
//     }else (
//         console.log(error)
//     )
// })

// Obtener de forma ordenada de mayor a menor, el número total de objetos o piezas agrupados por su situación dentro de la organización, esto es, cuántos hay expuestos, cuántos en itinerancia y cuántos almacenados.
let params = [];
let sql = "SELECT COUNT(*) AS num_piezas, coleccion.estado FROM pieza JOIN coleccion ON pieza.coleccion_id = coleccion.coleccion_id GROUP BY coleccion.estado ORDER BY num_piezas DESC"

codenotchDB.query(sql, params, (error, result) => {
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
        console.log('Conectado a la bbdd museo')
    }else {
        console.log(error)
    }
})