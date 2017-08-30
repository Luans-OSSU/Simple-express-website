let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let nodemailer = require("nodemailer");


let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome"
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact/send", (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "email",
            pass: "pass"
        }
    });

    let mailOptions = {
        from: "Daniil Merkulov <email>",
        to: "email",
        subject: "Website submit",
        text: "You have a submission with the following details... Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.message,
        html: "<p>You have a submission with the following details...</p><ul><li>Name: " + req.body.name + "</li><li>Email: " + req.body.email + "</li><li>Message: " + req.body.message + "</li></ul>"
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.redirect("/");
        } else {
            console.log("Message sent: " + info.response);
            res.redirect("/");
        }


    })
});

app.listen(3000);
console.log("Server is running on port 3000");