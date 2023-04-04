const nodemailer = require('nodemailer');

const sendEmail =async options => {
//1) Ceate a transporter
 const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
    // Active in gmail "less secure app" option
 });
//2)Define the email options
 const mailOption={
        from:process.env.EMAIL_USERNAME,
        to:options.email,
        subject:"for reset password",
        message:"mail send"
       // html:`<p> hii "+name",please copy link <a href="http://localhost:3000/resetpassword?token=`+token+`">for reset password</a>`
    };

//3) ctually send the email
await transporter.sendMail(mailOption);
};

module.exports = sendEmail;