const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postMark = require('postmark');

const app = express();

require("dotenv").config();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/api", (req, res, next) => {
    res.send('API Status: A-Okay');
});

app.post("/api/email", (req, res, next) => {
    const client = new postMark.Client(process.env.API_KEY);
    client.sendEmail({
        "From": "ahall25@mail.greenriver.edu",
        "To": "adamhhall93@gmail.com",
        "Subject": "Website Inquiry From: " + req.body.email,
        "TextBody": req.body.message
    }).then(r  => {
        res.status(200).json({
            success:true
        });
    })
        .catch(error => {
            console.log("error", error);
            res.status(401).json({
                success:false
            });
        })
});


app.listen(process.env.PORT || 5000)