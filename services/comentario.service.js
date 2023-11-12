// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var UsuarioController = require('../controllers/users.controller');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//esta funcion lo que hace es crear un comentario agregandolo al array que contiene los 
//comentarios pendientes del usuario que corresponda. 
exports.crearComentario = async function (comentario) {

    try {

    // Generar un nuevo ObjectId
    const nuevoObjectId = new ObjectId();

    // Asignar el mismo _id a ambos comentarios
    comentario._id = nuevoObjectId;
        
    await UsuarioService.modificarArrayComentariosPendientes(comentario);
    await ServicioService.modificarArrayComentarios(comentario);

    return comentario;
    } catch (e) {
        console.error(e);
        throw Error('Error al crear el comentario');
    }
}

exports.deleteComentario = async function (id_comentario, id_servicio) {

    console.log(id_comentario);
    console.log(id_servicio);
    // Delete the Comentario
    try {

        const result = await ServicioService.borrarComentario(id_comentario, id_servicio);
        console.log("Resultado de borrar comentario:", result);

        return result;
    } catch (e) {
        throw Error("Error Occurred while Deleting the Comentario");
    }
}

//cambia el estado del comentario a aceptado en el servicio y lo elimina de comentariosPendientes en usuario
exports.aceptarComentario = async function (id_servicio, id_comentario, id_usuario) {
    console.log(id_comentario);
    console.log(id_servicio);
    console.log(id_usuario);

    try {
        //se borra el comentario, cuando se acepta y cuando se cancela, porque ya no está mas pendiente
        await UsuarioService.borrarComentario(id_comentario, id_usuario);

        //cambiamos el estado en servicio a aceptado
        let result = await ServicioService.aceptarComentario(id_servicio, id_comentario);

        return result;
    } catch (e) {
        throw Error("Error Occurred while aceptar  comentario");
    }
}

//muestra los comentarios que tiene pendientes el profesor
exports.mostrarComentariosPendientes = async function (id_usuario) {
    console.log(id_usuario);
    // Delete the Comentario
    try {
        //que me devuelva las referencias a los servicios el usuario
        //le digo a servicios que me devuelva la lista con los comentarios pendientes

        const result = await ServicioService.getComentariosPorIds(id_usuario);
        console.log("Los comentarios pendientes de este usuario son:", result);

        return result;
    } catch (e) {
        throw Error("Ocurrio un error intentando mostrar los comentarios pendientes");
    }
}
