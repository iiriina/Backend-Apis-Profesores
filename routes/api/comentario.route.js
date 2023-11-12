var express = require('express')
var router = express.Router()
var ComentarioController = require('../../controllers/comentarios.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET servicios listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentario.routes');
  });
router.put('/crearComentario', Authorization, ComentarioController.crearComentario) // lo usa la persona cuando comenta un servicio, se crea con estado pendiente por defecto



// Export the Router
module.exports = router;


