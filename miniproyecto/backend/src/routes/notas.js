// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getNota, postNota, putNota, deleteNota } = require('../controllers/notas')

// Crear los endpoints para la ruta /notas y atenderlos mediante sus controladores
router.get('/', getNota);
router.post('/', postNota);
router.put('/', putNota);
router.delete('/', deleteNota);

// Exportar router
module.exports = router;