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

router.get("/cidadeEdit/:id", (req, res) => {
    let id = req.params.id;

    cidade.findOne({ where: {id:id} }).then(cidade => {
        res.render("cidadeEdit", {
            cidade: cidade
        });
    })
})

router.post("/cidadeUpdate", (req, res) => {
    let nome = req.body.nomeCidade;
    let id = req.body.id;

    cidade.update({ nome: nome }, { where: {id:id}}).then(() => {
        res.redirect("cidades");
    })
})

router.post("/cidadeDelet", (req, res) => {
    let id = req.body.id;

    cidade.destroy({ where: {id:id} }).then(() => {
        res.redirect("cidades");
    })
})

module.exports = router;