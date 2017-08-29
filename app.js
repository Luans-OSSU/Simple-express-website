let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let nodemailer = require("nodemailer");


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(3000);
console.log("Server is running on port 3000");