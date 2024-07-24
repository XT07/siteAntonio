const express = require("express");
const router = express.Router();
const category = require("./Category");
const auth = require("../../midleware/midleware");

router.get("/category", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }
    category.findAll({ order: [ [ "ID","DESC" ] ] }).then(categorys => {
        res.render("category", {
            categorys: categorys,
            conf:conf
        });
    })
})

router.get("/categoryNew", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }
    res.render("categoryNew", {
        conf:conf
    });
})

router.post("/categorySave", auth, (req, res) => {
    let nomeCategory = req.body.nomeCategory;

    category.create({
        nome: nomeCategory
    }).then(() => {
        res.redirect("/category");
    }).catch(err => {
        console.log(`Erro ao salvar a categoria | ${err} |`);
    })
})

router.get("/categoryEdit/:id", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }

    let id = parseInt(req.params.id);
    category.findOne({ where: { id:id } }).then(category => {
        res.render("categoryEdit", {
            category: category,
            conf:conf
        });
    })
})

router.post("/categoryEditSave", auth, (req, res) => {
    let id = parseInt(req.body.id);
    let nome = req.body.nomeCategory;

    category.update({nome: nome }, { where: {id:id} }).then(() => {
        res.redirect("/category");
    })
})

router.post("/categoryDelet", auth, (req, res) => {
    let id = parseInt(req.body.id);
    category.destroy({ where: { id:id } }).then(() => {
        res.redirect("/category");
    })
})

module.exports = router;