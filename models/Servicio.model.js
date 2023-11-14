var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Comentario = require('./Comentario.model');  // Importa el modelo de comentario
const { ObjectId } = require('mongoose');


var ServicioSchema = new mongoose.Schema({
    id_usuario: ObjectId,
    nombre_usuario: String,
    titulo: String,
    experiencia: String,
    imagenUrl: String,
    nombre_servicio: String,
    descripcion: String,
    duracion: String,
    frecuencia: String,
    calificacion: Number,
    precio: Number,
    categoria: String,
    tipo_de_clase: String,
    visibilidad: String, //para decir si es visible o no el servicio
    comentarios: [Comentario.schema]  // Indica que comentarios es un array de objetos de comentario
})

ServicioSchema.plugin(mongoosePaginate)
const Servicio = mongoose.model('servicios', ServicioSchema)

module.exports = Servicio;