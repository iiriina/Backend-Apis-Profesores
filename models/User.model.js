var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Comentario = require('./Comentario.model');
const Contratacion = require('./Contratacion.model');


var UserSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    contrasenia: String,
    telefono: Number,
    titulo: String,
    experiencia: String,
    foto: String,
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],
    comentariosPendientes: [Comentario.schema],
    contrataciones: [Contratacion.schema]
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuarios', UserSchema)

module.exports = User;