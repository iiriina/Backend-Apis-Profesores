function validateCrearComentario(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.body.id_servicio || !req.body.id_usuario || !req.body.nombre_estudiante || (!req.body.comentario && isNaN(req.body.calificacion))) {
        return res.status(400).json({ status: 400, message: "Todos los campos son obligatorios: 'id_servicio', 'id_usuario', 'nombre_estudiante', y al menos 'comentario' o 'calificacion'" });
    }

    // Validar que 'id_servicio' y 'id_usuario' sean cadenas de texto no vacías
    if (typeof req.body.id_servicio !== 'string' || req.body.id_servicio.trim() === '' ||
        typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_servicio' y 'id_usuario' deben ser strings no vacíos" });
    }

    // Validar que 'nombre_estudiante' sea una cadena de texto no vacía
    if (typeof req.body.nombre_estudiante !== 'string' || req.body.nombre_estudiante.trim() === '') {
        return res.status(400).json({ status: 400, message: "'nombre_estudiante' debe ser una cadena de texto no vacía" });
    }

    // Validar que 'calificacion' sea un número en el rango de 1 a 5 (si está presente)
    if (req.body.calificacion !== undefined && (isNaN(req.body.calificacion) || req.body.calificacion < 1 || req.body.calificacion > 5)) {
        return res.status(400).json({ status: 400, message: "'calificacion' debe ser un número en el rango de 1 a 5" });
    }

    // Validar que 'comentario' sea una cadena de texto no vacía (si 'calificacion' no está presente)
    if (!req.body.calificacion && (typeof req.body.comentario !== 'string' || req.body.comentario.trim() === '')) {
        return res.status(400).json({ status: 400, message: "'comentario' debe ser una cadena de texto no vacía" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateBorrarComentario(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (!req.query.id_comentario || !req.query.id_servicio || !req.query.id_usuario) {
        return res.status(400).json({ status: 400, message: "Todos los campos son obligatorios: 'id_comentario', 'id_servicio', y 'id_usuario'" });
    }

    // Validar que 'id_comentario', 'id_servicio' y 'id_usuario' sean cadenas de texto no vacías
    if (typeof req.query.id_comentario !== 'string' || req.query.id_comentario.trim() === '' ||
        typeof req.query.id_servicio !== 'string' || req.query.id_servicio.trim() === '' ||
        typeof req.query.id_usuario !== 'string' || req.query.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_comentario', 'id_servicio' y 'id_usuario' deben ser strings no vacíos" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateMostrarComentariosPendientes(req, res, next) {
    // Verificar que se proporcione el campo obligatorio
    if (!req.query.id_usuario) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el 'id_usuario' en (query params)" });
    }

    // Validar que 'id_usuario' sea una cadena de texto no vacía
    if (typeof req.query.id_usuario !== 'string' || req.query.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_usuario' debe ser una cadena de texto no vacía en (query params)" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateAceptarComentario(req, res, next) {
    // Validar que se proporcionen todos los campos necesarios
    if (!req.body.id_servicio || !req.body.id_comentario || !req.body.id_usuario) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el id del Servicio, Comentario y Usuario para aceptar el comentario" });
    }

    // Validar que los IDs no sean cadenas vacías
    if (typeof req.body.id_servicio !== 'string' || req.body.id_servicio.trim() === '' ||
        typeof req.body.id_comentario !== 'string' || req.body.id_comentario.trim() === '' ||
        typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "Los IDs no pueden ser cadenas de texto vacías" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}



module.exports = {
    validateCrearComentario,
    validateBorrarComentario,
    validateMostrarComentariosPendientes,
    validateAceptarComentario
};
