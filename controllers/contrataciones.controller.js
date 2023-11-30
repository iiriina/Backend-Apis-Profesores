var ContratacionService = require('../services/contratacion.service');
var UsuarioService = require('../services/user.service');
var ComentarioService = require('../services/comentario.service');

// Saving the context of this module inside the _the variable
_this = this;

//crea una contratacion y la guarda en el array de contrataciones de usuario
exports.crearContratacion = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id_usuario) {
        return res.status(400).json({status: 400, message: "Necesitas enviar el id del Usuario a agregarle Contratacion"})
    }

    console.log("llegue al controller",req.body)
    var Contratacion = {
        nombre_estudiante: req.body.nombre_estudiante,
        telefono: req.body.telefono,
        email: req.body.email,
        horarios: req.body.horarios,
        motivos: req.body.motivos,
        estado: 'solicitada', // solicitada, aceptada, finalizada, cancelada. por defecto se crea en pendiente
        orden: 1 //el orden 1 es para las que son solicitadas, orden 2 para aceptada, orden 3 para finalizada, orden 4 para cancelada
    }
    try {
        //necesito que me pasen el ID del usuario y el body de la contratacion. 
        var createdContratacion = await ContratacionService.crearContratacion(Contratacion, req.body.id_usuario)
        return res.status(201).json({ createdContratacion, message: "Succesfully Created Contratacion"})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al crear la Contratacion" });
    }
}


//muestra las contrataciones de un usuario, por id de usuario
exports.getContratacionesPorIdUsuario = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.query.id_usuario) {
        return res.status(400).json({status: 400, message: "Necesitas enviar el id del Usuario para ver las Contrataciones"})
    }
    
    try {
        var Contrataciones = await ContratacionService.getContratacionesPorIdUsuario(req.query.id_usuario);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contrataciones, message: "Succesfully Contrataciones Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

//cambia el estado de la contratación por el que fue seleccionado por el usuario 
exports.cambiarEstadoContratacion = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.id_contratacion) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id de la Contratacion a Modificar"})
    }

    try {
        var updatedContratacion = await ContratacionService.cambiarEstadoContratacion(req.body.id_contratacion, req.body.id_usuario, req.body.estado)
        return res.status(200).json({status: 200, data: updatedContratacion, message: "Succesfully Updated Contratacion"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}
