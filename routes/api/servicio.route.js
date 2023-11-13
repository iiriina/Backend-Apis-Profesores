var express = require('express')
var router = express.Router()
var ServicioController = require('../../controllers/servicios.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET servicios listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/servicio.routes');
  });
router.post('/crearServicio', Authorization, ServicioController.crearServicio)
router.delete('/eliminarServicio', Authorization, ServicioController.eliminarServicio)
router.put('/cambiarVisibilidad', Authorization, ServicioController.cambiarVisibilidadServicio)
router.get('/servicios', ServicioController.getServicios) //muestra todos los servicios que cumple con filtros
router.get('/serviciosDeUsuario',Authorization, ServicioController.getServiciosDeUsuario)
router.get('/servicioPorIdServicio', ServicioController.getServicioPorIdServicio) //muestra la info del servicio y los comentarios al que le hizo click el usuario en ver más



router.put('/modificarServicio',Authorization, ServicioController.modificarServicio)
//router.put('/agregarComentario',Authorization, ServicioController.agregarComentario)



// Export the Router
module.exports = router;


