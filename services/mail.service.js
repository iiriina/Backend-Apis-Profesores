const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const resetLink = 'http://localhost:5173/resetpwd';


const sendMail = async (email) => {

const msg = {
  to: email,
  from: process.env.MAIL_USER,
  subject: 'Cambia tu contraseña',
  text: 'Cambia tu contraseña',
  html: `<p>Haz click en el siguiente enlace para cambiar tu contraseña:</p><a href="${resetLink}">Cambiar Contraseña</a>`,
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