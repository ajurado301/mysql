// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getAsignatura, postAsignatura, putAsignatura, deleteAsignatura } = require('../controllers/asignaturas')

// Crear los endpoints para la ruta /asignaturas y atenderlos mediante sus controladores
router.get('/', getAsignatura);
router.post('/', postAsignatura);
router.put('/', putAsignatura);
router.delete('/', deleteAsignatura);

// Exportar router
module.exports = router;