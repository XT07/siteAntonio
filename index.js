const express = require("express");
const app = express();
const reUserControler = require("./registerUser/reUserControler");
const registerEventControler = require("./registerEvent/registerEventControler");
const admControler = require("./adminControler/adminControler");
const connection = require("./db/connection");
const bodyParser = require("body-parser");
const event = require("./registerEvent/ReEvent");
const user = require("./adminControler/Reuser");
const categoryControler = require("./adminControler/categoryControler/categoryControler");
const cidadeControler = require("./adminControler/cidadeControler/cidadeControler");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch(err => {
        console.log(`Falha ao tentar afetuar a conexão com o banco de dados | erro | ${err}`);
    })

app.use("/", reUserControler);
app.use("/", registerEventControler);
app.use("/", admControler);
app.use("/", categoryControler);
app.use("/", cidadeControler);

app.get("/", (req, res) => {
    event.findAll({ limit: 3, order: [ [ "id","DESC" ] ], where: { dvPago: true } }).then(events => {
        res.render("home", {
            events: events
        });
    })
})

app.get("/about", (req,res) => {
    res.render("about");
})

app.listen(3030, () => {
    console.log("Server on");
})