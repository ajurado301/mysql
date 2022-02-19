// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getProfesor, postProfesor, putProfesor, deleteProfesor } = require('../controllers/profesores')

// Crear los endpoints para la ruta /profesores y atenderlos mediante sus controladores
router.get('/', getProfesor);
router.post('/', postProfesor);
router.put('/', putProfesor);
router.delete('/', deleteProfesor);

// Exportar router
module.exports = router;