const express = require("express");
const router = express.Router();
const cidade = require("./Cidade");

router.get("/cidades", (req, res) => {
    cidade.findAll().then(cidades => {
        res.render("cidades", {
            cidades: cidades
        });
    })
})

router.get("/cidadesNew", (req, res) => {
    res.render("cidadesNew");
})

router.post("/cidadesSave", (req, res) => {
    let nome = req.body.nomeCidade;

    cidade.create({
        nome: nome
    }).then(() => {
        res.redirect("/cidades");
    }).catch(err => {
        console.log(`Não foi possivel adicionar a cidade ao banco de dadso erro | ${err} |`);
    })
})

router.post("/cidadeDelet", (req, res) => {
    
})

module.exports = router;