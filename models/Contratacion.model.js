const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ContratacionSchema = new mongoose.Schema({
    // Asumo que el servicio y el profesor estarán incrustados en el usuario
    nombre_estudiante: String,
    telefono: Number,
    email: String,
    horarios: String,
    motivos: String,
    estado: String, // aceptado, finalizado, cancelado
    orden: Number
});

ContratacionSchema.plugin(mongoosePaginate);

const Contratacion = mongoose.model('contrataciones', ContratacionSchema)

module.exports = Contratacion;