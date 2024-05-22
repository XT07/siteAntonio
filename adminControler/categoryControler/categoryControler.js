const express = require("express");
const router = express.Router();
const category = require("./Category");

router.get("/category", (req, res) => {
    category.findAll({ order: [ [ "ID","DESC" ] ] }).then(categorys => {
        res.render("category", {
            categorys: categorys
        });
    })
})

router.get("/categoryNew", (req, res) => {
    res.render("categoryNew");
})

router.post("/categorySave", (req, res) => {
    let nomeCategory = req.body.nomeCategory;

    category.create({
        nome: nomeCategory
    }).then(() => {
        res.redirect("/category");
    }).catch(err => {
        console.log(`Erro ao salvar a categoria | ${err} |`);
    })
})

router.get("/categoryEdit/:id", (req, res) => {
    let id = parseInt(req.params.id);
    category.findOne({ where: { id:id } }).then(category => {
        res.render("categoryEdit", {
            category: category
        });
    })
})

router.post("/categoryEditSave", (req, res) => {
    let id = parseInt(req.body.id);
    let nome = req.body.nomeCategory;

    category.update({nome: nome }, { where: {id:id} }).then(() => {
        res.redirect("/category");
    })
})

router.post("/categoryDelet", (req, res) => {
    let id = parseInt(req.body.id);
    category.destroy({ where: { id:id } }).then(() => {
        res.redirect("category");
    })
})

module.exports = router;