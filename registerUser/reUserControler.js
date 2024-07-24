const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/registerUser", (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    res.render("registerUser", {
        conf:conf
    });
})

router.post("/userSave", async (req, res) => {
    let nome = req.body.nameUser;
    let email = req.body.email;
    let telefone = req.body.tel;
    let senha = req.body.password;

    let verific = await User.findOne( { where: { email:email } });

    if(!verific){

        let salt = 10;
        let bSenha = await bcrypt.hash(senha, salt);
        User.create({
            nome: nome,
            email: email,
            telefone: telefone,
            senha: bSenha
        }).then(() => {
            res.redirect("userList");
        })
    }else {
        res.status(400).send("E-mail já cadastrado");
    }
})

router.get("/userList", (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    User.findAll().then(user => {
        res.render("userList", {
            user: user,
            conf:conf
        })
    })
})

router.post("/userDelet", (req, res) => {
    let id = req.body.id;

    User.destroy({ where: {id:id} }).then(() => {
        res.redirect("userList");
    })
})

module.exports = router;