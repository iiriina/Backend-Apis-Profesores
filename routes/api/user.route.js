var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');

// Importar todos los middleware de validaciónvalidateEmail
const validationMiddleware = require('../../middleware/validationUser');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', validationMiddleware.validateCreateUser, UserController.crearUsuario) //validado
router.post('/login/',validationMiddleware.validateLoginUser, UserController.loginUsuario) //validado
router.post('/userByMail', UserController.getUsersByMail)

/* router.get('/users',Authorization, UserController.getUsers)
router.put('/update', Authorization, UserController.updateUser)
router.delete('/delete', Authorization, UserController.removeUser) */

router.post('/solicitarCambioContrasenia',validationMiddleware.validateEmail, UserController.solicitarCambioContrasenia) //solicita cambio contrasenia

router.put('/cambiarContrasenia', validationMiddleware.validateChangePassword, UserController.cambiarContrasenia) //solicita cambio contrasenia

// Export the Router
module.exports = router;


