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
