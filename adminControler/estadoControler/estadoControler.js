const express = require("express");
const router = express.Router();
const estado = require("./Estado");
const auth = require("../../midleware/midleware");

router.get("/estado", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    estado.findAll().then(estados => {
        res.render("estado.ejs", {
            estados: estados,
            conf: conf
        });
    })
})

router.get("/estadoNew", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    res.render("estadoNew.ejs", {
        conf: conf
    });
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

    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    estado.findOne({ where: {id:estId} }).then(est => {
        res.render("estadoEdit.ejs", {
            est:est,
            conf:conf
        })
    })
})

router.get("/estadoUpdate", auth, (req, res) => {
    let estId = req.body.estId;
    let nome = req.body.nomeEst;

    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    estado.update({nome:nome},{ where: {id:estId} }).then(est => {
        res.render("estadoEdit.ejs", {
            est:est,
            conf:conf
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