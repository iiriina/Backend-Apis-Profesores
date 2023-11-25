// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Saving the context of this module inside the _the variable
_this = this

// voy a obtener el usuario según el id que corresponda
exports.getUsers = async function (query) {
    try {
        console.log("Query", query);

        // Find users based on the query
        const users = await User.find(query);
        console.log("los usuarios que hay son" + users);

        // Devolver 0 si hay usuarios, 1 si no hay usuarios
        return users.length > 0 ? 0 : 1;
    } catch (e) {
        // Manejar errores y devolver 1 en caso de error
        console.error("Error in services", e);
        return 1;
    }
}



exports.updateUser = async function (user) {
    
    var id = {name :user.name}
    console.log(id)
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
        console.log (oldUser)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.name = user.name
    oldUser.email = user.email
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}


exports.deleteUser = async function (id) {
    console.log(id)
    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


//desde aca empieza lo que cree yo

exports.crearUsuario = async function (user) {

    // Validar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('Correo electrónico ya está en uso');
    }    
    
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.contrasenia, 8);
    
    var newUser = new User({
        nombre: user.nombre,
        email: user.email,
        contrasenia: hashedPassword,
        telefono: user.telefono,
        titulo: user.titulo,
        experiencia: user.experiencia,
        servicios: [],
        comentariosPendientes: [],
        contrataciones: []    
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}


exports.loginUsuario = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.contrasenia, _details.contrasenia);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}

//Agrega la referencia del servicio al array del usuario
exports.agregarRefServicioAUsuario = async function (id_usuario, id_servicio) {

    // Convertir el id_usuario a ObjectId y el servicio también
    const userId = mongoose.Types.ObjectId(id_usuario);
    const servicioId = mongoose.Types.ObjectId(id_servicio);

    // Crear la query para buscar al usuario
    const query = { _id: userId };
    
    var detallesUsuario = await this.getUsers(query);
    console.log(detallesUsuario)
    var usuario = detallesUsuario[0];
    // Verificar si el usuario existe
    if (!detallesUsuario) {
        return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }

    // Agregar la referencia al servicio al array de referencias de servicios de usuario
    usuario.servicios.push(servicioId);
    console.log(servicioId);
    console.log(usuario.servicios);
    // Guardar el usuario actualizado

    // If no old User Object exists return false
    if (!usuario) {
        return false;
    }
    try {
        var usuario = await usuario.save()
        return usuario;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

// Borra la referencia de un servicio cuando se borra el servicio
exports.borrarRefServicioAUsuario = async function (id_servicio, id_usuario) {
    try {
        // Convertir el id_usuario a ObjectId y el servicio también
        const userId = mongoose.Types.ObjectId(id_usuario);
        const servicioId = mongoose.Types.ObjectId(id_servicio);

        // Buscar al usuario
        let usuario = await User.findOne({ _id: userId });

        // Verificar si el usuario existe
        if (!usuario) {
            throw Error("Usuario no encontrado");
        }

        // Utilizar $pull para eliminar la referencia del servicio del array
        await usuario.updateOne({ $pull: { servicios: servicioId } });

        // Devolver el usuario actualizado
        return usuario;
    } catch (e) {
        throw Error("Ocurrió un error al actualizar el usuario: " + e.message);
    }
}

//devuelve los id de servicios que tiene guardado el array del usuario
exports.getIdsServiciosDeUsuario = async function (id_usuario) {
    try {
        // Obtiene al usuario y su array de referencias a servicios
        const usuario = await User.findById(id_usuario).select('servicios').exec();
        if (!usuario) {
            throw Error("Usuario no encontrado");
        }

        // Extrae el array de referencias a servicios del usuario
        return usuario.servicios;
    } catch (e) {
        throw Error("Error al obtener los IDs de servicios del usuario: " + e.message);
    }
}

//Agrega un nuevo comentario pendeinte al array de comentariosPendientes
exports.modificarArrayComentariosPendientes = async function (comentario) {
    try {
      // Actualizar el array de comentarios del servicio usando la función update
      const result = await User.updateOne(
        { _id: comentario.id_usuario },
        { $push: { comentariosPendientes: comentario } }
      );
  
      // Verificar el resultado de la operación de actualización
      if (result.nModified === 0) {
        throw Error("No se pudo modificar el array de comentarios del usuario");
      }
  
      return result;
    } catch (e) {
      throw Error("Error al modificar el array de comentarios del usuario: " + e.message);
    }
};



//se borra un comentario del array de comentariosPendientes (porque fue aceptado, o porque fue cancelado)
exports.borrarComentario = async function (id_comentario, id_usuario) {
    try {
        console.log("id comentario" + id_comentario);
        console.log("id usuario" + id_usuario);
        // Actualizar el array de comentarios del usuario usando la función update
        const result = await User.updateOne(
            { _id: id_usuario },
            { $pull: { comentariosPendientes: { _id: id_comentario } } }
        );
        console.log("holiiiiiiiiii sellega aca???");
        console.log(result);

        // Verificar el resultado de la operación de actualización
        if (result.nModified === 0) {
            throw Error("No se pudo borrar el comentario del usuario");
        }
        return result;
    } catch (e) {
        throw Error("Error al borrar el comentario del usuario: " + e.message);
    }
}

//itera el array de comentarios pendientes que tiene y muestra los comentarios
exports.getComentariosPendientes = async function (id_usuario) {
    try {
        // Obtener al usuario por su ID
        const usuario = await User.findById(id_usuario).exec();

        // Verificar si el usuario existe
        if (!usuario) {
            throw Error("Usuario no encontrado");
        }

        // Acceder al array de comentarios pendientes en el usuario
        const comentariosPendientes = usuario.comentariosPendientes;

        return comentariosPendientes;
    } catch (e) {
        throw Error("Error al obtener los comentarios pendientes del usuario: " + e.message);
    }
}

//Agrega una nueva contratacion al array de contrataciones
exports.modificarArrayContrataciones = async function (contratacion, id_usuario) {
    try {
      // Actualizar el array de contrataciones del servicio usando la función update
      const result = await User.updateOne(
        { _id: id_usuario },
        { $push: { contrataciones: contratacion } }
      );
  
      // Verificar el resultado de la operación de actualización
      if (result.nModified === 0) {
        throw Error("No se pudo modificar el array de contrataciones del usuario");
      }
  
      return result;
    } catch (e) {
      throw Error("Error al modificar el array de contrataciones del usuario: " + e.message);
    }
};

//muestra las contrataciones de un usuario por id de usuario
exports.getContrataciones = async function (id_usuario) {
    try {
        // Obtener al usuario por su ID
        const usuario = await User.findById(id_usuario).exec();

        // Verificar si el usuario existe
        if (!usuario) {
            throw Error("Usuario no encontrado");
        }
        usuario.contrataciones.sort((a, b) => a.orden - b.orden);

        // Acceder al array de comentarios pendientes en el usuario
        const contrataciones = usuario.contrataciones;

        return contrataciones;
    } catch (e) {
        throw Error("Error al obtener las contrataciones del usuario: " + e.message);
    }
}

//le cambia el estado a la contratacion segun por el que ingresa el usuario 
exports.cambiarEstadoContratacion = async function (id_contratacion, id_usuario, estado) {
    try {
        // Asegurarme de que sea un ObjectId
        const userId = mongoose.Types.ObjectId(id_usuario);
        console.log(id_usuario);
        // Buscar el usuario por el Id
        const usuario = await User.findById(userId);

        // Encontrar la contratación dentro del array de contrataciones del usuario
        const contratacion = usuario.contrataciones.find(contratacion => contratacion._id.equals(id_contratacion));

        // Verificar si la contratación fue encontrada
        if (!contratacion) {
            throw Error("Contratación no encontrada");
        }

        // Cambiar el estado de la contratación
        contratacion.estado = estado;

        // Asignar un orden según el estado
        switch (estado) {
            case 'solicitada':
                contratacion.orden = 1;
                break;
            case 'aceptada':
                contratacion.orden = 2;
                break;
            case 'finalizada':
                contratacion.orden = 3;
                break;
            case 'cancelada':
                contratacion.orden = 4;
                break;
            default:
                throw Error("Estado de contratación no válido");
        }

        // Guardar el usuario actualizado
        await usuario.save();
        console.log(usuario.contrataciones[0].estado);
        console.log(usuario.contrataciones[0]);
        // Devolver la contratación actualizada
        return contratacion;
    } catch (e) {
        throw Error("Error al cambiar el estado de la contratación: " + e.message);
    }
};

//Le pasan por parametro la contrasenia y el email y actualiza el usuario
exports.cambiarContrasenia = async function (email, contrasenia) {

    try {

        var filter = {email:email}
        console.log(filter)
        try {
            //Find the old User Object by the email
            var oldUser = await User.findOne(filter);
            console.log (oldUser)
        } catch (e) {
            throw Error("Error al encontrar el usuario al que le quieres cambiar la contrasenia")
        }
        // If no old User Object exists return false
        if (!oldUser) {
            return false;
        }
        //Edit the User Object
        var hashedPassword = bcrypt.hashSync(contrasenia, 8);
        oldUser.contrasenia = hashedPassword

        try {
            var savedUser = await oldUser.save()
            return savedUser;
        } catch (e) {
            throw Error("Error al guardar el usuario con la nueva contrasenia");
        }
    
        //No te devuelve un token porque te lleva a la pantalla de iniciar sesion cuando apretaste cambiar contra, 
        //ahora podes iniciar sesion con tus nuevas credenciales
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error al guardar el usuario con la nueva contrasenia")
    }
}

