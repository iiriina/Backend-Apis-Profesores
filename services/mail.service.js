const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const resetLink = 'http://localhost:5173/cambiarContrasenia';


const sendMail = async (email) => {

const msg = {
  to: email,
  from: process.env.MAIL_USER,
  subject: 'Cambia tu contraseña',
  text: 'Cambia tu contraseña',
  html: `<p>Hola ❤️! Soy la administradora de Educapp </p><p> Tal parece que has solicitado un cambio de contraseña. Si es así, Haz click en el siguiente enlace para crear una nueva contraseña:</p><a href="${resetLink}">Cambiar Contraseña</a><p>Si no has sido tu, puedes ignorar este mensaje, que tengas un bonito día!</p>`,
}

sgMail
  .send(msg)
  .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

module.exports = {
    sendMail,
};