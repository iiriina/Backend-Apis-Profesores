// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var UsuarioService = require('../services/user.service');
var UsuarioController = require('../controllers/users.controller');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

//esta funcion lo que hace es crear un comentario agregandolo al array que contiene los 
//comentarios pendientes del usuario que corresponda. 
exports.crearComentario = async function (id_usuario, comentario) {

    try {
    // Obtener el usuario asociado al comentario
    // Convertir el id_usuario a ObjectId
    /*
    const userId = mongoose.Types.ObjectId(id_usuario);

    // Crear la query para buscar al usuario
    const query = { _id: userId };
    
    var detallesUsuario = await UsuarioService.getUsers(query);
    console.log(detallesUsuario)
    var usuario = detallesUsuario[0];
    // Verificar si el usuario existe
    if (!detallesUsuario) {
        return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
        // Agregar el comentario al array de comentarios pendientes del usuario
        usuario.comentarios.push(nuevoComentario);
        console.log(nuevoComentario);
        console.log(usuario.comentarios);
        // Guardar el usuario actualizado
    */

    await UsuarioService.modificarArrayUsuario(id_usuario, comentario);

    return comentario;
    } catch (e) {
        console.error(e);
        throw Error('Error al crear el comentario');
    }
}
