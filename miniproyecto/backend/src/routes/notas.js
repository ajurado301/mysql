// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getNota, postNota, putNota, deleteNota, getNotaMedia, getNotaApuntada, getNotaImpartida } = require('../controllers/notas')

// Crear los endpoints para la ruta /alumnos y atenderlos mediante sus controladores
router.get('/', getNota);
router.get('/media', getNotaMedia);
router.get('/apuntadas', getNotaApuntada);
router.get('/impartidas', getNotaImpartida);
router.post('/', postNota);
router.put('/', putNota);
router.delete('/', deleteNota);

// Exportar router
module.exports = router;