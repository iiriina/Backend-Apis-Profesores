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
        console.log("los usuarios que hay son" + users)
        // Return the users
        return users;
    } catch (e) {
        // return an Error message describing the reason
        console.error("Error in services", e);
        throw Error('Error while retrieving Users');
    }
}

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
        foto: user.foto,
        comentarios: [],
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

exports.modificarArrayUsuario = async function (id_usuario, comentario) {

    // Convertir el id_usuario a ObjectId
    const userId = mongoose.Types.ObjectId(id_usuario);

    // Crear la query para buscar al usuario
    const query = { _id: userId };
    
    var detallesUsuario = await this.getUsers(query);
    console.log(detallesUsuario)
    var usuario = detallesUsuario[0];
    // Verificar si el usuario existe
    if (!detallesUsuario) {
        return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
        // Agregar el comentario al array de comentarios pendientes del usuario
        usuario.comentarios.push(comentario);
        console.log(comentario);
        console.log(usuario.comentarios);
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