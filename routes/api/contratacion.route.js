var express = require('express')
var router = express.Router()
var ContratacionController = require('../../controllers/contrataciones.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET Contrataciones listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contratacion.routes');
  });

router.post('/crearContratacion', ContratacionController.crearContratacion) // lo usa la persona cuando contrata un servicio, se crea con estado solicitada por defecto
router.get('/mostrarContrataciones',Authorization, ContratacionController.getContratacionesPorIdUsuario) // mis contrataciones
router.put('/cambiarEstadoContratacion',Authorization, ContratacionController.cambiarEstadoContratacion) // mis contrataciones


// Export the Router
module.exports = router;

