// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getApuntadas } = require('../controllers/apuntadas')

// Crear los endpoints para la ruta /apuntadas y atenderlos mediante sus controladores
router.get('/', getApuntadas);
// Exportar router
module.exports = router;