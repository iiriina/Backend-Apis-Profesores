var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuarios', UserSchema)

module.exports = User;