function validateCreateUser(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ status: 400, message: "El cuerpo de la solicitud no puede estar vacío" });
    }

    if (!req.body.nombre) {
        return res.status(400).json({ status: 400, message: "El campo 'nombre' es obligatorio" });
    }

    if (!req.body.email) {
        return res.status(400).json({ status: 400, message: "El campo 'email' es obligatorio" });
    }

    if (!req.body.contrasenia) {
        return res.status(400).json({ status: 400, message: "El campo 'contrasenia' es obligatorio" });
    }

    if (!req.body.telefono) {
        return res.status(400).json({ status: 400, message: "El campo 'telefono' es obligatorio" });
    }

    if (!req.body.titulo) {
        return res.status(400).json({ status: 400, message: "El campo 'titulo' es obligatorio" });
    }

    if (!req.body.experiencia) {
        return res.status(400).json({ status: 400, message: "El campo 'experiencia' es obligatorio" });
    }

    // Validar que los campos no sean cadenas de texto vacías
    if (
        typeof req.body.nombre !== 'string' || req.body.nombre.trim() === '' ||
        typeof req.body.email !== 'string' || req.body.email.trim() === '' ||
        typeof req.body.contrasenia !== 'string' || req.body.contrasenia.trim() === '' ||
        typeof req.body.titulo !== 'string' || req.body.titulo.trim() === '' ||
        typeof req.body.experiencia !== 'string' || req.body.experiencia.trim() === ''
    ) {
        return res.status(400).json({ status: 400, message: "Los campos no pueden ser cadenas de texto vacías" });
    }

    // Validar que el campo 'telefono' sea un número
    if (isNaN(req.body.telefono)) {
        return res.status(401).json({ status: 401, message: "El campo 'telefono' debe ser un número" });
    }
    
    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateLoginUser(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ status: 400, message: "El cuerpo de la solicitud no puede estar vacío" });
    }

    if (!req.body.email) {
        return res.status(400).json({ status: 400, message: "El campo 'email' es obligatorio" });
    }

    if (!req.body.contrasenia) {
        return res.status(400).json({ status: 400, message: "El campo 'contrasenia' es obligatorio" });
    }

    // Validar que los campos no sean cadenas de texto vacías
    if (
        typeof req.body.email !== 'string' || req.body.email.trim() === '' ||
        typeof req.body.contrasenia !== 'string' || req.body.contrasenia.trim() === ''
    ) {
        return res.status(400).json({ status: 400, message: "Los campos no pueden ser cadenas de texto vacías" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateEmail(req, res, next) {
    if (!req.body || !req.body.email) {
        return res.status(400).json({ status: 400, message: "El campo 'email' es obligatorio" });
    }

    // Validar que el campo 'email' no sea una cadena de texto vacía
    if (typeof req.body.email !== 'string' || req.body.email.trim() === '') {
        return res.status(400).json({ status: 400, message: "El campo 'email' no puede ser una cadena de texto vacía" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}

function validateChangePassword(req, res, next) {
    if (!req.body || !req.body.email) {
        return res.status(400).json({ status: 400, message: "El campo 'email' es obligatorio" });
    }

    if (!req.body.contrasenia) {
        return res.status(400).json({ status: 400, message: "El campo 'contrasenia' es obligatorio" });
    }

    // Validar que los campos no sean cadenas de texto vacías
    if (
        typeof req.body.email !== 'string' || req.body.email.trim() === '' ||
        typeof req.body.contrasenia !== 'string' || req.body.contrasenia.trim() === ''
    ) {
        return res.status(400).json({ status: 400, message: "Los campos no pueden ser cadenas de texto vacías" });
    }

    // Si todas las validaciones pasan, pasar al siguiente middleware o ruta
    next();
}


module.exports = {
    validateCreateUser,
    validateLoginUser,
    validateEmail,
    validateChangePassword
};
