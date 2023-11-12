/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var servicios = require('./api/servicio.route')
var comentarios = require('./api/comentario.route')
var contrataciones = require('./api/contratacion.route')

router.use('/users', users);
router.use('/servicios', servicios);
router.use('/comentarios', comentarios);
router.use('/contrataciones', contrataciones);

module.exports = router;
