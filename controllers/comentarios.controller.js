var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var ComentarioService = require('../services/comentario.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.crearComentario = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    var Comentario = {
        id_servicio: req.body.id_servicio,
        id_usuario: req.body.id_usuario,
        nombre_estudiante: req.body.nombre_estudiante,
        comentario: req.body.comentario,
        calificacion: req.body.calificacion,
        estado: "pendiente" // se crea con estado pendiente por defecto
    }
    try {
        //necesito que me pasen el ID del usuario y el body del comentario. 
        var createdComentario = await ComentarioService.crearComentario(Comentario)
        return res.status(201).json({ createdComentario, message: "Succesfully Created Comentario"})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al crear el Comentario" });
    }
}


exports.borrarComentario = async function (req, res, next) {

    //le tengo que mandar el id del comentario y el id del servicio en el body
    var id_comentario = req.body.id_comentario;
    var id_servicio = req.body.id_servicio;

    try {
        await ComentarioService.deleteComentario(id_comentario, id_servicio);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
