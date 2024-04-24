const express = require("express");
const ReEvent = require("./ReEvent");
const router = express.Router();
const slugify = require("slugify");

router.get("/registerEvent", (req, res) => {
    res.render("registerEvent");
})

router.post("/reEventSave", (req, res) => {
    let enderEvent = req.body.enderEvent;
    let cep = req.body.cep;
    let avRua = req.body.avRua;
    let num = req.body.num;
    let complemento = req.body.complemento;
    let bairro = req.body.bairro;
    let city = req.body.city;
    let est = req.body.est;
    let eventName = req.body.eventName;
    let imgEvent = req.body.imgEvent;
    let eventPago = req.body.eventPago === 'on' ? true : false;
    let aboutEvent = req.body.aboutEvent;
    let categorySelector = req.body.categorySelector;
    let descriptionEvent = req.body.descriptionEvent;
    let dtInit = req.body.dtInit;
    let dtEnd = req.body.dtEnd;
    let timeInit = req.body.timeInit;
    let timeEnd = req.body.timeEnd;
    let nameEventP = req.body.nameEventP;
    let aboutEventP = req.body.aboutEventP;
    let responsability = req.body.responsability === 'on' ? true : false;

    ReEvent.create({
        Nome_evento: eventName,
        Slug: slugify(eventName),
        endereco: enderEvent,
        cep: cep,
        Av_Rua: avRua,
        numero: num,
        complemento: complemento,
        bairro: bairro,
        cidade: city,
        estado: est,
        imagem: imgEvent,
        dvPago: eventPago,
        assunto: aboutEvent,
        detalhesEvento: descriptionEvent,
        dataInicio: dtInit,
        dataFim: dtEnd,
        horaInicio: timeInit,
        horaFim: timeEnd,
        produtor: nameEventP,
        sobreProdutor: aboutEventP,
        termos: responsability,
        categoriaId: categorySelector
    }).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(`Erro ao registrar o evento | erro | ${err}`);
    })
})

module.exports = router;