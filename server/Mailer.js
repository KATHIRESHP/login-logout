const nodemailer = require('nodemailer')
// const express = require('express')
// const app = express()

// app.use(express.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '20bcs4038@mkce.ac.in',
        pass: 'Neet*2022'
    }
})

function generateEmail(req, res, email, forWhat){
    console.log("email generation "+email);
    const otp = String(Math.ceil(Math.random() * 100000));
    const mailOptions = {
        from: "20bcs4038@mkce.ac.in",
        to: email,
        subject: "Registeration OTP",
        html: `<i>Your OTP is </i><h3>${otp}</h3>`
    }
    transporter.sendMail(mailOptions, (err, resp) =>{
        if(err)
        {
            console.log("This is nodemailer error\n");
            console.log(err);
        }
        else
        {
            console.log(`Otp is ${otp}`);
            // console.log("Email sent "+ JSON.stringify(res));
            res.send({msg: otp})
        }
    })
}


module.exports = {
    generateEmail
}