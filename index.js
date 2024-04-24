const express = require("express");
const app = express();
const reUserControler = require("./registerUser/reUserControler");
const registerEventControler = require("./registerEvent/registerEventControler");
const admControler = require("./adminControler/adminControler");
const connection = require("./db/connection");

app.set("view engine", "ejs");
app.use(express.static("public"));

connection
    .authenticate()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch(err => {
        console.log("Falha ao tentar afetuar a conexão com o banco de dados");
    })

app.use("/", reUserControler);
app.use("/", registerEventControler);
app.use("/", admControler);

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/about", (req,res) => {
    res.render("about");
})

app.listen(8080, () => {
    console.log("Server on");
})