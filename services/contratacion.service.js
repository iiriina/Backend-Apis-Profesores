// Gettign the Newly created Mongoose Model we just created 
var Servicio = require('../models/Servicio.model');
var ServicioService = require('../services/servicio.service');
var UsuarioService = require('../services/user.service');
var ContratacionService = require('../services/contratacion.service');
var UsuarioController = require('../controllers/users.controller');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//esta funcion lo que hace es crear una contratacion agregandolo al array que contiene las
//contrataciones en el usuario que corresponda. 
exports.crearContratacion = async function (contratacion, id_usuario) {

    try {
        
    await UsuarioService.modificarArrayContrataciones(contratacion, id_usuario);

    return contratacion;
    } catch (e) {
        console.error(e);
        throw Error('Error al crear la contratacion');
    }
}


//muestra las contrataciones que tiene el usuario por el id de usuario
exports.getContratacionesPorIdUsuario = async function (id_usuario) {
    console.log(id_usuario);

    try {
        const result = await UsuarioService.getContrataciones(id_usuario);

        return result;
    } catch (e) {
        throw Error("Ocurrio un error intentando mostrar las contrataciones");
    }
}


//le cambia el estado a la contratacion segun por el que ingresa el usuario 
exports.cambiarEstadoContratacion = async function (id_contratacion, id_usuario, estado) {
    try {
        const contratacion = await UsuarioService.cambiarEstadoContratacion(id_contratacion, id_usuario, estado);

        // Devolver la contratación actualizada
        return contratacion;
    } catch (e) {
        throw Error("Error al cambiar el estado de la contratación: " + e.message);
    }
};

