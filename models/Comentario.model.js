const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { ObjectId } = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    id_servicio: ObjectId,
    id_usuario: ObjectId,
    nombre_estudiante: String,
    comentario: String,
    calificacion: Number,
    estado: String
});

ComentarioSchema.plugin(mongoosePaginate);

const Comentario = mongoose.model('comentarios', ComentarioSchema)

module.exports = Comentario;