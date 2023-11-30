var express = require('express')
var router = express.Router()
var ComentarioController = require('../../controllers/comentarios.controller');
var Authorization = require('../../auth/authorization');

// Importar todos los middleware de validación
const validationMiddleware = require('../../middleware/validationComentario');

// Authorize each API with middleware and map to the Controller Functions
/* GET servicios listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentario.routes');
  });
router.put('/crearComentario', validationMiddleware.validateCrearComentario, ComentarioController.crearComentario) // lo usa la persona cuando comenta un servicio, se crea con estado pendiente por defecto
router.delete('/borrarComentario', validationMiddleware.validateBorrarComentario, Authorization, ComentarioController.borrarComentario)
router.post('/aceptarComentario', validationMiddleware.validateAceptarComentario, Authorization, ComentarioController.aceptarComentario)
router.get('/mostrarComentariosPendientes', validationMiddleware.validateMostrarComentariosPendientes, Authorization, ComentarioController.mostrarComentariosPendientes)

// Export the Router
module.exports = router;


