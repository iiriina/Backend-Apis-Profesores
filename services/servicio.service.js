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

exports.deleteServicio = async function (id) {
    console.log(id)
    // Delete the Servicio
    try {
        var deleted = await Servicio.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Servicio Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Servicio")
    }
}

exports.cambiarVisibilidadServicio = async function (servicio) {
    
    // Asegurarme de que sea un ObjectId
    const userId = mongoose.Types.ObjectId(servicio._id);

    var id = {_id :servicio._id}
    console.log(id)
    try {
        //Find the old Servicio Object by the Id
        var oldServicio = await Servicio.findOne(id);
        console.log (oldServicio)
    } catch (e) {
        throw Error("Error occured while Finding the Servicio")
    }
    // If no old Servicio Object exists return false
    if (!oldServicio) {
        return false;
    }
    //Edit the User Object
    oldServicio.visibilidad = servicio.visibilidad
    try {
        var savedServicio = await oldServicio.save()
        return savedServicio;
    } catch (e) {
        throw Error("And Error occured while updating the Visibilidad del Servicio");
    }
}

exports.getServicios = async function (query) {

    try {
        console.log("Query", query);

        // Find servicios based on the query
        const servicios = await Servicio.find(query);
        console.log("los servicios que hay son" + servicios)
        // Return the users
        return servicios;
    } catch (e) {
        // return an Error message describing the reason
        console.error("Error in services", e);
        throw Error('Error while retrieving servicios');
    }
}
