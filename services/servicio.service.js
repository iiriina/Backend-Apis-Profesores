// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var UsuarioService = require('../services/user.service');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

exports.crearServicio = async function (servicio) {
    // Convertir el id_usuario a ObjectId
    const userId = mongoose.Types.ObjectId(servicio.id_usuario);

    // Crear la query para buscar al usuario
    const query = { _id: userId };
    

    var detallesUsuario = await UsuarioService.getUsers(query);
    console.log(detallesUsuario)
    var usuario = detallesUsuario[0];
    // Verificar si el usuario existe
    if (!detallesUsuario) {
        return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }

    var newServicio = new Servicio({
        id_usuario: servicio.id_usuario,
        nombre_usuario: usuario.nombre,
        titulo: usuario.titulo,
        experiencia: usuario.experiencia,
        foto: usuario.foto,
        nombre_servicio: servicio.nombre_servicio,
        descripcion: servicio.descripcion,
        duracion: servicio.duracion,
        frecuencia: servicio.frecuencia,
        calificacion: servicio.calificacion,
        precio: servicio.precio,
        categoria: servicio.categoria,
        tipo_de_clase: servicio.tipo_de_clase,
        visibilidad: servicio.visibilidad,
        comentarios: []  // Indica que comentarios es un array de objetos de comentario
    })

    try {
        // Saving el servicio 
        var savedServicio = await newServicio.save();
        console.log("se guardo esto en la bdd" + savedServicio);
        return savedServicio; //Esto lo cambie, antes se devolvia el token cuando se creaba el usuario
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Servicio")
    }
}
