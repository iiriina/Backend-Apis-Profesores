var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.crearServicio = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    var Servicio = {
        id_usuario: req.body.id_usuario,
        nombre_servicio: req.body.nombre_servicio,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        calificacion: req.body.calificacion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        tipo_de_clase: req.body.tipo_de_clase,
        visibilidad: req.body.visibilidad,
        comentarios: []
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdServicio = await ServicioService.crearServicio(Servicio)
        return res.status(201).json({ createdServicio, message: "Succesfully Created Service"})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al crear el Servicio" });
    }
}

exports.eliminarServicio = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await ServicioService.deleteServicio(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.cambiarVisibilidadServicio = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id del Servicio a Borrar"})
    }

    var Servicio = {
        _id: req.body._id,
        visibilidad: req.body.visibilidad
    }

    try {
        var updatedServicio = await ServicioService.cambiarVisibilidadServicio(Servicio)
        return res.status(200).json({status: 200, data: updatedServicio, message: "Succesfully Updated Servicio"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getServicios = async function (req, res, next) {
    //ahi adentro de la request me van a llegar los parametros que quiero cambiar basicamente
    let filtro= req.body
    try {
        var Servicios = await ServicioService.getServicios(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Servicios, message: "Succesfully Servicios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
