// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getGrupo, postGrupo, putGrupo, deleteGrupo } = require('../controllers/grupos')

// Crear los endpoints para la ruta /alumnos y atenderlos mediante sus controladores
router.get('/', getGrupo);
router.post('/', postGrupo);
router.put('/', putGrupo);
router.delete('/', deleteGrupo);

// Exportar router
module.exports = router;