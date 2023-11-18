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

module.exports = {
    validateCrearServicio,
};
