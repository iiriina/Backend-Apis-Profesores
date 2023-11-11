var express = require('express')
var router = express.Router()
var ServicioController = require('../../controllers/servicios.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/servicio.routes');
  });
router.post('/crearServicio', Authorization, ServicioController.crearServicio)
router.delete('/eliminarServicio', Authorization, ServicioController.eliminarServicio)
router.put('/cambiarVisibilidad', Authorization, ServicioController.cambiarVisibilidadServicio)



// Export the Router
module.exports = router;


