var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var ComentarioService = require('../services/comentario.service');

// Saving the context of this module inside the _the variable
_this = this;

//anda bien, crea el comentario en el usuario y en el servicio
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

//borra el comentario del array de comentariosPendientes de usuario 
//y borra el comentario del array de comentarios del servicio
exports.borrarComentario = async function (req, res, next) {

    //le tengo que mandar el id del comentario y el id del servicio en la query
    var id_comentario = req.query.id_comentario;
    var id_servicio = req.query.id_servicio;
    var id_usuario = req.query.id_usuario;

    try {
        await ComentarioService.deleteComentario(id_comentario, id_servicio, id_usuario);
        res.status(200).json({ rdo: 0, mensaje: "se eliminó correctamente." });
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

//cambia el estado del comentario a aceptado en el servicio, y lo borra de comentariosPendientes del usuario
exports.aceptarComentario = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id_servicio) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id del Servicio a Modificar"})
    }

    if (!req.body.id_comentario) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id del Comentario a Modificar"})
    }

    if (!req.body.id_usuario) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id del Usuario a Modificar"})
    }

    try {
        await ComentarioService.aceptarComentario(req.body.id_servicio, req.body.id_comentario, req.body.id_usuario)
        return res.status(200).json({status: 200, message: "Se acepto el comentario"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

//muestra todos los comentarios pendientes de un usuario
exports.mostrarComentariosPendientes = async function (req, res, next) {

    //le tengo que mandar el id del comentario y el id del servicio en los params
    var id_usuario = req.query.id_usuario;

    try {
        let comentariosPendientes = await ComentarioService.mostrarComentariosPendientes(id_usuario);
        res.status(200).send({ comentariosPendientes , message: "Succesfully Created Comentario"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
