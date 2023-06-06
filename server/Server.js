const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const Mailer = require('./Mailer')
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

var User;

mongoose.connect(process.env.CONN_STR)
    .then((con) => {
        console.log("DB 1 connected");
        User = require('./User')(mongoose.connection);
    })
    .catch((err) => console.log("error occurred" + err));

app.post('/emailverify', async (req, res) => {
    const email = req.body.email;
    await Mailer.generateEmail(req, res, email);
})

app.post('/pwdresetotp', async (req, res) => {
    const email = req.body.email;
    await Mailer.generateEmail(req, res, email);
})

app.post('/pwdreset', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("Password reset called!!");
    try {
        const user = await User.findOne({ email: email });
        user.password = password;
        await user.save();
        res.send({ msg: "success" });
    }
    catch (e) {

    }
})

app.post('/register', async function (req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phno = req.body.phno;
        const password = req.body.password;

        const duplicate_user = await User.findOne({ email: email });
        if (!duplicate_user) {
            const user = await User.create({
                name,
                email,
                phno,
                password
            })
            user.save();

            res.send({ msg: "Success" });

            console.log(user);
        }
        else
        {
            console.log("Duplicate user");
            res.send({ msg: "Duplicate"})
        }
    }
    catch (err) {
        console.log(err);
        console.log("\nThis is the error msg\n");
        console.log(err.message);
        res.send({ msg: "error" });
    }
})

app.post('/login', async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let user_details = await User.where({ email: email, password: password });
        if (user_details.length === 0) {
            console.log("no such file found");
            res.send([{ msg: "no_user" }]);
        }
        else {
            console.log("file found");
            res.send([{ msg: "user_found" }, { user_details: user_details }]);
        }
    }
    catch (e) {
        console.log("Exception " + e);
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