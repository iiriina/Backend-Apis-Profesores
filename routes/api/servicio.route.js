var express = require('express')
var router = express.Router()
var ServicioController = require('../../controllers/servicios.controller');
var Authorization = require('../../auth/authorization');
// Importar todos los middleware de validaciónvalidateEmail
const validationMiddleware = require('../../middleware/validationServicio');
// Configura multer para guardar los archivos en la memoria
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Authorize each API with middleware and map to the Controller Functions
/* GET servicios listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/servicio.routes');
  });
router.post('/crearServicio', Authorization, upload.single('imagen'), ServicioController.crearServicio); //validado
router.delete('/eliminarServicio', validationMiddleware.validateEliminarServicio, Authorization,  ServicioController.eliminarServicio) //validado
router.put('/cambiarVisibilidad', validationMiddleware.validateCambiarVisibilidadServicio, Authorization, ServicioController.cambiarVisibilidadServicio)
router.get('/servicios', ServicioController.getServicios) //muestra todos los servicios que cumple con filtros
router.get('/serviciosDeUsuario', validationMiddleware.validateGetServiciosDeUsuario, Authorization, ServicioController.getServiciosDeUsuario)
router.get('/servicioPorIdServicio', validationMiddleware.validateGetServicioPorIdServicio, ServicioController.getServicioPorIdServicio) //muestra la info del servicio y los comentarios al que le hizo click el usuario en ver más


router.put('/modificarServicio',Authorization, upload.single('imagen'), ServicioController.modificarServicio)
//router.put('/agregarComentario',Authorization, ServicioController.agregarComentario)



// Export the Router
module.exports = router;


