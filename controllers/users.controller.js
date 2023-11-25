var UserService = require('../services/user.service');
const MailService = require('../services/mail.service');


// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getUsersByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    console.log(filtro)
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    var User = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


//aca empiezan los metodos que cree yo

exports.crearUsuario = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        nombre: req.body.nombre,
        email: req.body.email,
        contrasenia: req.body.contrasenia,
        telefono: req.body.telefono,
        titulo: req.body.titulo,
        experiencia: req.body.experiencia,
        servicios: [],
        comentariosPendientes: [],
        contrataciones: []    
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.crearUsuario(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (error) {
        if (error.message === 'Correo electrónico ya está en uso') {
            return res.status(400).json({ status: 400, message: "El correo electrónico ya está en uso" });
        } else {
            console.error(error);
            return res.status(400).json({ status: 400, message: "Error al crear el usuario" });
        }
    }
}



exports.loginUsuario = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        contrasenia: req.body.contrasenia
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUsuario(User);
        if (loginUser===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}


//se llama cuando el usuario apriete el boton de que olvido su contrasenia, le manda un mail 
//tiene que completar el mail.. 
exports.solicitarCambioContrasenia = async function (req, res, next) {
    try {
        if (!req.body.email){
            return res.status(400).json({ status: 400, message: "Tienes que ingresar el email!" });
        }
        /* let filtro = { email: req.body.email }
        // Lógica para enviar el correo electrónico
        var existeUsuario = await UserService.getUsers(filtro);
        //si no existe un usuario con ese mail, no se manda ningún mail
        if (existeUsuario === 1) {
            return res.status(404).json({ status: 404, message: "No existe un usuario con ese correo electrónico" });
        }*/
        // Crear la query para buscar al usuario
        const query = { email: req.body.email };

        var detallesUsuario = await UserService.getUsers(query);
        console.log(detallesUsuario)
        // Verificar si el usuario existe
        if (!detallesUsuario) {
            return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
        }

        await MailService.sendMail(req.body.email);
        // Respuesta exitosa
        return res.status(200).json({ status: 200, message: "Se ha enviado un correo electrónico" });
    } catch (error) {
        // Manejo de errores
        console.error("Error al enviar el correo electrónico:", error);
        return res.status(400).json({ status: 400, message: "Ocurrió un error al enviar el correo electrónico" });
    }
};


//actualizar el campo de contraseña con lo que envia en el GUARDAR CONTRASEÑA la persona después de que 
//accedio a la pantalla que le llego por mail
exports.cambiarContrasenia = async function (req, res, next) {

    try {
        
        await UserService.cambiarContrasenia(req.body.email, req.body.contrasenia)
        return res.status(201).json({ status: 200, message: "Se cambio la contrasenia"})

    } catch (error) {

        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al cambiar la contrasenia" });
    
    }

};

