const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const User = require('./User')
const Mailer = require('./Mailer')
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONN_STR)
    .then((con) => console.log("db connnected"))
    .catch((err) => console.log("error occurred"));

app.post('/emailverify', async (req, res) => {
    const email = req.body.email;
    await Mailer.generateEmail(req, res, email);
})

app.post('/register', async function(req, res){
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phno = req.body.phno;
        const password = req.body.password;

        const user = await User.create({
            name,
            email,
            phno,
            password
        })
        user.save();

        res.send({msg: "Success"});

        console.log(user);
    }
    catch(err){
        console.log(err);
        console.log("\nThis is the error msg\n");
        console.log(err.message);
        res.send({msg: "error"});
    }
})

app.post('/login', async function(req, res) {
    try{
        const email = req.body.email;
        const password = req.body.password;
        let user_details = await User.where({email: email, password: password});
        if(user_details.length === 0)
        {
            console.log("no such file found");
            res.send([{msg: "no_user"}]);
        }
        else
        {
            console.log("file found");
            res.send([{msg: "user_found"}, {user_details: user_details}]);
        }
    }
    catch (e) {
        console.log("Exception "+ e);
    } 
})

app.listen(process.env.PORT, () => console.log("server listening")); 










// const testData = async () => {
//     try{
//         const user = await User.create({
//             name: "Kathiresh",
//             email: "kathire@gmal.com",
//             phno: 8283293629,
//             password: "Neet*2020"
//         })

//         user.save()
//         console.log(user);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

// testData();