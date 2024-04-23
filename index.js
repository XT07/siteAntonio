const express = require("express");
const app = express();
const reUserControler = require("./registerUser/reUserControler");
const registerEventControler = require("./registerEvent/registerEventControler");
const admControler = require("./adminControler/adminControler");

app.set("view engine", "ejs");
app.use(express.static("public"));

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