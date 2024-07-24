const express = require("express");
const router = express.Router();
const User = require("../registerUser/User");
const bcrypt = require("bcryptjs");
const auth = require("../midleware/midleware");

router.get("/logAdm", (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    res.render("login", {
        conf:conf
    });
})

router.get("/admPainel", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    res.render("admPainel", {
        conf:conf
    });
})

router.post("/logAuth", (req, res) => {
    let email = req.body.log;
    let senha = req.body.pass;

    User.findOne({ where: {email:email} }).then(user => {
        let verificPass = bcrypt.compareSync(senha, user.senha);

        if(user.email == "luizfelipe01700@gmail.com"){
            if(verificPass){
                req.session.ad = {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                };
            }
        }else{
            if(verificPass){
                req.session.user = {
                    id: user.id,
                    nome: user.nome,
                    email: user.email
                }
            }
        }
    }).then(() => {
        res.redirect("/");
    }).catch(err => {
        res.send(`Este e-mail não está cadastrado ou a senha está incorreta`);
        console.log(err);
    })
})

module.exports = router;