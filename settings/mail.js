var nodemailer = require('nodemailer');
// Create the transporter with the required configuration for Gmail
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'sergiybiluk@gmail.com',
        pass: 'serhiimicazook123!'
    }
});
module.exports=transporter;
