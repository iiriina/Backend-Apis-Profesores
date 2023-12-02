var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var CloudinaryService = require('../services/cloudinary.service');
const { cloudinary } = require('../services/cloudinary.service');

const streamifier = require('streamifier');

// Saving the context of this module inside the _the variable
_this = this;

//en el service se agrega la referencia a servicio en el usuario en el array de refservicios
exports.crearServicio = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    
    try {
        const fileBuffer = req.file.buffer; 
        console.log(req.body.imagen);  
        console.log("que se manda:", req.body);  
        console.log("que se manda:", req.file);  
        if (isNaN(req.body.precio)) {
            return res.status(400).json({ status: 400, message: `El campo precio debe ser un número válido` });
        }
    
        /*
        const response = await cloudinary.uploader.upload(fileString, {upload_preset: 'imagenes'});
        console.log(response);
        
        res.json(response)
        */
        const urlImg = await CloudinaryService.uploadImage(fileBuffer);
        // Calling the Service function with the new object from the Request Body
        var createdServicio = await ServicioService.crearServicio(req.body, urlImg)
        return res.status(201).json({ createdServicio, message: "Succesfully Created Service"})
    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: 400, message: "Error al crear el Servicio" });
    }
}

//en el service se quita la referencia al servicio en el usuario en el array de refservicios
exports.eliminarServicio = async function (req, res, next) {

    //le tengo que mandar el id del servicio y el id del usuario como params
    var id = req.query.id;
    var id_usuario = req.query.id_usuario;

    try {
        var deleted = await ServicioService.deleteServicio(id, id_usuario);
        return res.status(200).json({ deleted, message: "Succesfully Deleted Service"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.cambiarVisibilidadServicio = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Necesitas enviar el id del Servicio a Modificar"})
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

//con filtros en la bsuqueda
exports.getServicios = async function (req, res, next) {
    //ahi adentro de la request me van a llegar los parametros que quiero cambiar basicamente
    let filtro= req.query;
    try {
        var Servicios = await ServicioService.getServicios(filtro);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Servicios, message: "Succesfully Servicios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

//ahora voy a obtener los servicios de un usuario en especifico:
exports.getServiciosDeUsuario = async function (req, res, next) {
    let id_usuario = req.query.id_usuario;

    try {
        var Servicios = await ServicioService.getServiciosPorIds(id_usuario);
        // Devuelve la lista de servicios con el código HTTP y el mensaje apropiado.
        return res.status(200).json({ status: 200, data: Servicios, message: "Succesfully Servicios Recieved" });
    } catch (e) {
        // Devuelve un mensaje de error con el código y el mensaje de error.
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.modificarServicio = async function (req, res, next) {
    try {
        let imageUrl;
        console.log(req.file);
        // Verificar si se proporciona una nueva imagen
        if (req.file && req.file.buffer) {
            // Subir la nueva imagen y obtener la URL
            console.log("la imagen que llega es", req.file.buffer);
            console.log("hola??");
            imageUrl = await CloudinaryService.uploadImage(req.file.buffer);
        }

        // Crear el objeto actualizado con la nueva URL si existe
        const updatedServiceData = {
            ...req.body,
            imagenUrl: imageUrl || req.body.imagenUrl // Usa la nueva URL si existe, de lo contrario, usa la existente
        };

        // Llamar a la función para modificar el servicio
        var updatedServicio = await ServicioService.modificarServicio(updatedServiceData);

        return res.status(200).json({ status: 200, data: updatedServicio, message: "Succesfully Updated Servicio" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


//trae el servicio en el que aprete ver más en la busqueda, o sea tiene que filtrar los comentarios
//para que en el front se muestren solo los que fueron aceptados. 
exports.getServicioPorIdServicio = async function (req, res, next) {

    let id_servicio = req.query.id_servicio; // Cambiado a req.params para leer el parámetro de la URL
    try {
        var Servicios = await ServicioService.getServicioPorIdServicio(id_servicio)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Servicios, message: "Succesfully Servicio Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

