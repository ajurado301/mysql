// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumnos')

// Crear los endpoints para la ruta /alumnos y atenderlos mediante sus controladores
router.get('/', getAlumno);
router.post('/', postAlumno);
router.put('/', putAlumno);
router.delete('/', deleteAlumno);

// Exportar router
module.exports = router;