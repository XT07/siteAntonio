const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", reUserControler);

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/about", (req,res) => {
    res.render("about");
})

app.listen(8080, () => {
    console.log("Server on");
})