const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Schema = mongoose.Schema
const port = 4000
app = express()

mongoose.connect('mongodb://localhost/Dance', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, "static")))
app.use(express.urlencoded({ extended: false }))

const contactSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    query: String
})
const contacts = mongoose.model("DanceContact", contactSchema)

// Pug
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.status(200)
    res.render("home.pug")
})

app.get("/contact", (req, res) => {
    res.status(200)
    res.render("contacts.pug")
})

app.post("/contact", (req, res) => {
    let con = new contacts(req.body)
    con.save().then(() => {
        res.status(200)
        res.send("Request recieved.")
    }).catch((err) => {
        console.log(err)
        res.status(400)
        res.send("Bad Request")
    })
})

app.listen(port, () => {
    console.log("Server started at port ", port)
})