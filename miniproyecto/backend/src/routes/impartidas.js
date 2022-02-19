// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getImpartidas } = require('../controllers/impartidas')

// Crear los endpoints para la ruta /impartidas y atenderlos mediante sus controladores
router.get('/', getImpartidas);

// Exportar router
module.exports = router;