const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const bodyparser = require("body-parser");

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.get("/email",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post("/send",(req,res)=>{

    let email1 = req.body.email1;
    let email2 = req.body.email2;
    let subject = req.body.subject;
    let message = req.body.message;

    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {user:process.env.user,pass:process.env.pass}
    });
    mail.sendMail({
        from: "adi.courseenrolment@gmail.com",
        to:[email1,email2],
        html: message,
        subject: subject,
    },(err)=>{console.log(err)});
    res.redirect("https://email-sender-nodejs-theta.vercel.app/email");
});
app.listen(port, (err)=>{
    if(err)
    throw err;
    console.log("server is running at ",port);
});
