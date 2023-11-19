const mongoose = require('mongoose');

function validateCrearServicio(req, res, next) {
    const requiredFields = [
        'id_usuario',
        'nombre_servicio',
        'descripcion',
        'duracion',
        'frecuencia',
        'precio',
        'categoria',
        'tipo_de_clase',
    ];
    console.log('req.body', req.body);
    console.log('req.file', req.file);
    
    // Verificar que se proporcionen todos los campos obligatorios
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ status: 400, message: `El campo '${field}' es obligatorio` });
        }
    }

    // Validar que los campos no sean cadenas de texto vacías
    for (const field of requiredFields) {
        if (typeof req.body[field] !== 'string' || req.body[field].trim() === '') {
            return res.status(400).json({ status: 400, message: `El campo '${field}' no puede estar vacío` });
        }
    }

    // Validar que los campos numéricos sean números
    const numericFields = ['calificacion', 'precio'];
    for (const field of numericFields) {
        if (isNaN(req.body[field])) {
            return res.status(400).json({ status: 400, message: `El campo '${field}' debe ser un número` });
        }
    }

    // Validar que se haya subido una imagen
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ status: 400, message: "Se requiere una imagen para el servicio" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateEliminarServicio(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.body || !req.body.id || !req.body.id_usuario) {
        return res.status(400).json({ status: 400, message: "Se requieren 'id' e 'id_usuario' en el cuerpo de la solicitud" });
    }

    // Validar que los campos 'id' e 'id_usuario' sean cadenas de texto no vacías
    if (typeof req.body.id !== 'string' || req.body.id.trim() === '' || typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "Los campos 'id' e 'id_usuario' no pueden estar vacíos" });
    }

    // Validar que 'id_usuario' sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.body.id_usuario)) {
        return res.status(400).json({ status: 400, message: "'id_usuario' no es un ObjectId válido" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateCambiarVisibilidadServicio(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.body || !req.body._id || req.body.visibilidad === undefined) {
        return res.status(400).json({ status: 400, message: "Se requieren '_id' y 'visibilidad' en el cuerpo de la solicitud" });
    }

    // Validar que '_id' sea una cadena de texto no vacía
    if (typeof req.body._id !== 'string' || req.body._id.trim() === '') {
        return res.status(400).json({ status: 400, message: "'_id' no puede estar vacío" });
    }

    // Validar que 'visibilidad' sea un string
    if (typeof req.body.visibilidad !== 'string' || req.body.visibilidad.trim() === '') {
        return res.status(400).json({ status: 400, message: "'visibilidad' debe ser un string no vacío" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}


function validateGetServiciosDeUsuario(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.body || !req.body.id_usuario) {
        return res.status(400).json({ status: 400, message: "Se requiere 'id_usuario' en el cuerpo de la solicitud" });
    }

    // Validar que 'id_usuario' sea una cadena de texto no vacía
    if (typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_usuario' debe ser un string no vacío" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}


function validateGetServicioPorIdServicio(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.body || !req.body.id_servicio) {
        return res.status(400).json({ status: 400, message: "Se requiere 'id_servicio' en el cuerpo de la solicitud" });
    }

    // Validar que 'id_servicio' sea una cadena de texto no vacía
    if (typeof req.body.id_servicio !== 'string' || req.body.id_servicio.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_servicio' debe ser un string no vacío" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}


module.exports = {
    validateCrearServicio,
    validateEliminarServicio,
    validateCambiarVisibilidadServicio,
    validateGetServiciosDeUsuario,
    validateGetServicioPorIdServicio
};
