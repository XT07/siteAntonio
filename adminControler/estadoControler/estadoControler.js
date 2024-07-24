const express = require("express");
const router = express.Router();
const estado = require("./Estado");
const auth = require("../../midleware/midleware");

router.get("/estado", auth, (req, res) => {
    estado.findAll().then(estados => {
        res.render("estado.ejs", {
            estados: estados
        });
    })
})

router.get("/estadoNew", auth, (req, res) => {
    res.render("estadoNew.ejs");
})

router.post("/estadoSave", auth, (req, res) => {
    let nome = req.body.nomeEst;

    estado.create({
        nome: nome
    }).then(() => {
        res.redirect("/estado");
    }).catch(err => {
        console.log(`Erro ao salvar o estado | ${err} |`);
    })
})

router.get("/estadoEdit", auth, (req, res) => {
    let estId = req.body.estId;

    estado.findOne({ where: {id:estId} }).then(est => {
        res.render("estadoEdit.ejs", {
            est:est
        })
    })
})

router.get("/estadoUpdate", auth, (req, res) => {
    let estId = req.body.estId;
    let nome = req.body.nomeEst;

    estado.update({nome:nome},{ where: {id:estId} }).then(est => {
        res.render("estadoEdit.ejs", {
            est:est
        })
    })
})

router.post("/estadoDelet", auth, (req, res) => {
    let estId = req.body.estId;

    estado.destroy({ where: {id:estId} }).then(() => {
        res.redirect("/estado");
    })
})

module.exports = router;