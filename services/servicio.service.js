// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var UsuarioService = require('../services/user.service');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

exports.crearServicio = async function (servicio, imagenUrl) {
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
        imagenUrl: imagenUrl,
        nombre_servicio: servicio.nombre_servicio,
        descripcion: servicio.descripcion,
        duracion: servicio.duracion,
        frecuencia: servicio.frecuencia,
        calificacion: servicio.calificacion,
        precio: servicio.precio,
        categoria: servicio.categoria,
        tipo_de_clase: servicio.tipo_de_clase,
        visibilidad: 'publico',
        comentarios: []  // Indica que comentarios es un array de objetos de comentario
    })

    try {
        // Saving el servicio 
        var savedServicio = await newServicio.save();
        console.log("se guardo esto en la bdd" + savedServicio);

        //y aca tengo que guardarme la referencia al servicio dentro del usuario 
        await UsuarioService.agregarRefServicioAUsuario(usuario._id, savedServicio._id);

        return savedServicio; //Esto lo cambie, antes se devolvia el token cuando se creaba el usuario
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Servicio")
    }
}

// se borra y borra la referencia del array de refservicios en usuario
exports.deleteServicio = async function (id, id_usuario) {
    console.log(id);
    console.log(id_usuario);
    // Delete the Servicio
    try {
        var deleted = await Servicio.deleteOne({
            _id: id
        });

        if (deleted.deletedCount === 0) {
            throw Error("Servicio Could not be deleted");
        }

        // Verificar la respuesta de borrarRefServicioAUsuario
        const result = await UsuarioService.borrarRefServicioAUsuario(id, id_usuario);
        console.log("Resultado de borrarRefServicioAUsuario:", result);

        return deleted;
    } catch (e) {
        throw Error("Error Occurred while Deleting the Servicio");
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

        // Find servicios based on the query. si no es publico el servicio no lo muestra
        const servicios = await Servicio.find({ ...query, visibilidad: 'publico' });
        console.log("los servicios que hay son" + servicios)
        // Return the users
        return servicios;
    } catch (e) {
        // return an Error message describing the reason
        console.error("Error in services", e);
        throw Error('Error while retrieving servicios');
    }
}


exports.modificarServicio = async function (servicio) {
    // Asegurarme de que sea un ObjectId
    const servicioId = mongoose.Types.ObjectId(servicio._id);

    try {
        // Buscar el servicio existente por su ID
        var oldServicio = await Servicio.findOne({ _id: servicioId });

        // Si no se encuentra el servicio, retorna false o maneja el caso según tus necesidades
        if (!oldServicio) {
            return false;
        }
        console.log("la url de la imagen nueva es", servicio.imagenUrl);
        // Iterar sobre las propiedades proporcionadas en el cuerpo de la solicitud
        Object.keys(servicio).forEach((prop) => {
            // Verificar si la propiedad existe en el servicio (en lo que me pasa el usuario) y no es "_id", ni undefined, ni null
            if (oldServicio[prop] !== undefined && oldServicio[prop] !== null && prop !== "_id" && servicio[prop] !== undefined && servicio[prop] !== null) {
                oldServicio[prop] = servicio[prop];
            }
        });
        console.log("el nombre que me llega acá es:", servicio.nombre_servicio);
        // Guardar el servicio modificado
        var savedServicio = await oldServicio.save();
        return savedServicio;
    } catch (e) {
        throw Error("Error al modificar el Servicio: " + e.message);
    }
}

//con los id de servicios que manda el usuario, obtiene los servicios y los devuelve.
exports.getServiciosPorIds = async function (id_usuario) {
    try {
        //llama a la funcion que devuelve los ids de servicios de un usuario en especifico
        const idsServicios = await UsuarioService.getIdsServiciosDeUsuario(id_usuario);

        // Busca los servicios correspondientes en la colección de servicios
        return await Servicio.find({ _id: { $in: idsServicios } }).exec();
    } catch (e) {
        throw Error("Error al obtener los servicios por IDs: " + e.message);
    }
}


exports.modificarArrayComentarios = async function (comentario) {
    try {
      // Actualizar el array de comentarios del servicio usando la función update
      const result = await Servicio.updateOne(
        { _id: comentario.id_servicio },
        { $push: { comentarios: comentario } }
      );
  
      // Verificar el resultado de la operación de actualización
      if (result.nModified === 0) {
        throw Error("No se pudo modificar el array de comentarios del servicio");
      }
  
      return result;
    } catch (e) {
      throw Error("Error al modificar el array de comentarios del servicio: " + e.message);
    }
};

//se borra un comentario del array de comentarios del servicio
exports.borrarComentario = async function (id_comentario, id_servicio) {
    try {
        // Actualizar el array de comentarios del servicio usando la función update
        const result = await Servicio.updateOne(
            { _id: id_servicio },
            { $pull: { comentarios: { _id: id_comentario } } }
        );

        // Verificar el resultado de la operación de actualización
        if (result.nModified === 0) {
            throw Error("No se pudo borrar el comentario del servicio");
        }

        return result;
    } catch (e) {
        throw Error("Error al borrar el comentario del servicio: " + e.message);
    }
}
/* 
exports.aceptarComentario = async function (id_servicio, id_comentario) {
    try {
        // Actualizar el estado del comentario en el array de comentarios del servicio
        const result = await Servicio.updateOne(
            { 
                _id: id_servicio,
                'comentarios._id': id_comentario
            },
            { $set: { 'comentarios.$.estado': 'aceptado' } }
        );

        // Verificar el resultado de la operación de actualización
        if (result.nModified === 0) {
            throw Error("No se pudo aceptar el comentario");
        }

        return result;
    } catch (e) {
        throw Error("Error al aceptar el comentario: " + e.message);
    }
}
*/

exports.aceptarComentario = async function (id_servicio, id_comentario) {
    try {
        // Obtener el servicio y el comentario
        const servicio = await Servicio.findById(id_servicio);
        const comentario = servicio.comentarios.find(c => c._id.toString() === id_comentario);

        // Verificar si se encontró el comentario
        if (!comentario) {
            throw Error("Comentario no encontrado");
        }

        // Filtrar solo los comentarios aceptados con calificación numérica
        const comentariosConCalificacion = servicio.comentarios
            .filter(c => c.estado === 'aceptado' && typeof c.calificacion === 'number');

        // Obtener las calificaciones
        const calificaciones = comentariosConCalificacion.map(c => c.calificacion);

        // Calcular el nuevo promedio y redondearlo
        const nuevoPromedio = (calificaciones.reduce((sum, calificacion) => sum + calificacion, 0) + (typeof comentario.calificacion === 'number' ? comentario.calificacion : 0)) / (calificaciones.length + (typeof comentario.calificacion === 'number' ? 1 : 0));

        // Redondear el nuevo promedio
        const nuevoPromedioRedondeado = Math.round(nuevoPromedio);

        // Actualizar el estado del comentario
        comentario.estado = 'aceptado';

        // Actualizar el campo calificacion en el documento del servicio con el nuevo promedio redondeado
        servicio.calificacion = nuevoPromedioRedondeado;

        // Guardar los cambios
        await servicio.save();

        return servicio;
    } catch (e) {
        throw Error("Error al aceptar el comentario: " + e.message);
    }
}




//devuelve el servicio que cumple con que el id del servicio sea el pedido
//y devuelve solo los comentarios que son aceptados
exports.getServicioPorIdServicio = async function (id_servicio) {

    try {
        // Utiliza el método findById para buscar un servicio por su id_servicio
        const servicio = await Servicio.findById(id_servicio);

        // Verifica si se encontró el servicio
        if (!servicio) {
            throw Error("Servicio no encontrado");
        }

        // Filtra los comentarios para incluir solo los aceptados
        const comentariosAceptados = servicio.comentarios.filter(comentario => comentario.estado === 'aceptado');

        // Crea una copia del servicio con los comentarios aceptados
        const servicioConComentariosAceptados = {
            ...servicio.toObject(),
            comentarios: comentariosAceptados
        };

        // Devuelve el servicio con los comentarios aceptados
        return servicioConComentariosAceptados;
    } catch (e) {
        // Retorna un mensaje de error describiendo la razón
        console.error("Error en el servicio", e);
        throw Error('Error al recuperar el servicio con comentarios aceptados');
    }
}

