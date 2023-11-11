const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

const ComentarioSchema = new mongoose.Schema({
    id_usuario: ObjectId,
    id_servicio: ObjectId,
    nombre_estudiante: String,
    comentario: String,
    calificacion: Number,
    estado: String
});

ComentarioSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;