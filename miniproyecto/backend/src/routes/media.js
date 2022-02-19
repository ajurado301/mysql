// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getMedia } = require('../controllers/media')

// Crear los endpoints para la ruta /media y atenderlos mediante sus controladores
router.get('/', getMedia);

// Exportar router
module.exports = router;