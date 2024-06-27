const express = require("express");
const router = express.Router();
const estado = require("./Estado");

router.get("/estado", (req, res) => {
    estado.findAll().then(estados => {
        res.render("estado.ejs", {
            estados: estados
        });
    })
})

router.get("/estadoNew", (req, res) => {
    res.render("estadoNew.ejs");
})

router.post("/estadoSave", (req, res) => {
    let nome = req.body.nome;

    estado.create({
        nome: nome
    }).then(() => {
        res.send("Olá gayzinho");
    }).catch(err => {
        console.log(`Erro ao salvar o estado | ${err} |`);
    })
})

router.get("/estadoEdit", (req, res) => {
    res.send("olá");
})

router.post("/estadoDelet", (req, res) => {
    res.send("olá");
})

module.exports = router;