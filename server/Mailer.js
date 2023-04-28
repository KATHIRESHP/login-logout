const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'google',
    auth: {
        user: '20bcs4038@mkce.ac.in',
        pass: 'Nrrxtrft*2022'
    }
})

function generateEmail(email){
    console.log("email generation "+email);
    const mailOptions = {
        from: "20bcs4038@mkce.ac.in",
        to: email,
        subject: "Registeration OTP",
        text: "This is your otp"
    }

    transporter.sendMail(mailOptions, (err, res) =>{
        if(err)
        {
            console.log("This is nodemailer error\n");
            console.log(err);
        }
        else
        {
            console.log("Email sent" + res);
        }
    })
    return 4567;
}

module.exports = {
    generateEmail
}