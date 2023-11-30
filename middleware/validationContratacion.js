function validateCrearContratacion(req, res, next) {
    // Verificar que se proporcionen los campos obligatorios
    if (
        !req.body ||
        !req.body.id_usuario ||
        !req.body.nombre_estudiante ||
        !req.body.telefono ||
        !req.body.email ||
        !req.body.horarios ||
        !req.body.motivos
    ) {
        return res.status(400).json({ status: 400, message: "Todos los campos son obligatorios" });
    }

    // Validar que los campos de texto no estén vacíos
    const textFields = ['nombre_estudiante', 'email', 'horarios', 'motivos'];
    for (const field of textFields) {
        if (typeof req.body[field] !== 'string' || req.body[field].trim() === '') {
            return res.status(400).json({ status: 400, message: `El campo '${field}' no puede estar vacío` });
        }
    }

    // Validar que 'id_usuario' sea una cadena de texto no vacía
    if (typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_usuario' debe ser un string no vacío" });
    }

    // Validar que 'telefono' sea un número
    if (isNaN(req.body.telefono)) {
        return res.status(400).json({ status: 400, message: "'telefono' debe ser un número" });
    }

    // Validar que 'email' sea un email válido (puedes ajustar según tu lógica específica)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ status: 400, message: "'email' debe ser un correo electrónico válido" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}


function validateGetContratacionesPorIdUsuario(req, res, next) {
    // Verificar que se proporciona el campo obligatorio 'id_usuario'
    if (!req.query.id_usuario) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el id del Usuario para ver las Contrataciones" });
    }

    // Validar que 'id_usuario' sea una cadena de texto no vacía
    if (typeof req.query.id_usuario !== 'string' || req.query.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_usuario' debe ser un string no vacío" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateCambiarEstadoContratacion(req, res, next) {
    // Verificar que se proporciona el campo obligatorio 'id_contratacion'
    if (!req.body.id_contratacion) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el id de la Contratación a Modificar" });
    }

    // Verificar que se proporciona el campo obligatorio 'id_usuario'
    if (!req.body.id_usuario) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el id del Usuario para modificar la Contratación" });
    }

    // Verificar que se proporciona el campo obligatorio 'estado'
    if (!req.body.estado) {
        return res.status(400).json({ status: 400, message: "Necesitas enviar el nuevo estado de la Contratación" });
    }

    // Validar que 'id_contratacion' y 'id_usuario' sean cadenas de texto no vacías
    if (typeof req.body.id_contratacion !== 'string' || req.body.id_contratacion.trim() === '' ||
        typeof req.body.id_usuario !== 'string' || req.body.id_usuario.trim() === '') {
        return res.status(400).json({ status: 400, message: "'id_contratacion' y 'id_usuario' deben ser strings no vacíos" });
    }

    // Validar que 'estado' sea una cadena de texto no vacía y tenga un valor válido
    if (typeof req.body.estado !== 'string' || req.body.estado.trim() === '' ||
        !['solicitada', 'aceptada', 'finalizada', 'cancelada'].includes(req.body.estado)) {
        return res.status(400).json({ status: 400, message: "'estado' debe ser un string no vacío y tener un valor válido" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

module.exports = {
    validateCrearContratacion,
    validateGetContratacionesPorIdUsuario,
    validateCambiarEstadoContratacion
};
