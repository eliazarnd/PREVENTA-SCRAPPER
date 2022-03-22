const nodemailer = require("nodemailer");
//const dotenv = require('dotenv'); //Used for environment variables
//dotenv.config();


async function sendEmail(body, subject){

  
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // use SSL
        auth: {
            user: "federico.shields37@ethereal.email",
            pass: "K2hVPJyyhQg9xsKA27"
        }
    });

    const options = {
        from: "BUY TICKECTS",
        to: "eliazardev@gmail.com",
        subject: subject,
        html: body.body
    }

    transporter.sendMail(options, function(err, information) {
        if(err)
            return console.log(err)

         console.log("El mensaje ha sido enviado con exito", information.response);   
    });
}


module.exports = {
    sendEmail
}
