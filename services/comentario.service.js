// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var ServicioService = require('../services/servicio.service');
var UsuarioController = require('../controllers/users.controller');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

//esta funcion lo que hace es crear un comentario agregandolo al array que contiene los 
//comentarios pendientes del usuario que corresponda. 
exports.crearComentario = async function (comentario) {

    try {
    
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
        throw Error("Error Occurred while Deleting the Servicio");
    }
}
