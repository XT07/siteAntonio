const express = require("express");
const router = express.Router();
const estado = require("./Estado");

router.get("/estado", (req, res) => {
    res.send("Olá gay");
})

router.post("estadoSave", (req, res) => {
    let nome = req.body.nome;

    estado.create({
        nome: nome
    }).then(() => {
        res.send("Olá gayzinho");
    }).catch(err => {
        console.log("Erro ao salvar o estado");
    })
})