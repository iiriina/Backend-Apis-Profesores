var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    contrasenia: String,
    telefono: Number,
    titulo: String,
    experiencia: String,
    foto: String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuarios', UserSchema)

module.exports = User;