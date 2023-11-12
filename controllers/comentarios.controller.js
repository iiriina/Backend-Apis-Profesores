var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var ComentarioService = require('../services/comentario.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.crearComentario = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    var Comentario = {
        id_servicio: req.body.id_servicio, //id usuario no lo tengo porque esta incrustado en el usuario. id servicio si va porque lo voy a tener que poner ahi si lo acepta el profe
        nombre_estudiante: req.body.nombre_estudiante,
        comentario: req.body.comentario,
        calificacion: req.body.calificacion,
        estado: "pendiente" // se crea con estado pendiente por defecto
    }
    try {
        // Calling the Service function with the new object from the Request Body
        //necesito que me pasen el ID del usuario y el body del comentario. 
        var createdComentario = await ComentarioService.crearComentario(req.body.id_usuario, Comentario)
        return res.status(201).json({ createdComentario, message: "Succesfully Created Comentario"})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al crear el Comentario" });
    }
}
