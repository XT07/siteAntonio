const express = require("express");
const ReEvent = require("./ReEvent");
const router = express.Router();
const slugify = require("slugify");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 70 * 1024 }});
const events = require("./ReEvent");

router.get("/registerEvent", (req, res) => {
    res.render("registerEvent");
})

router.post("/reEventSave", upload.single('imgEvent'), (req, res) => {
    let enderEvent = req.body.enderEvent;
    let cep = req.body.cep;
    let localEvento = req.body.localEvento;
    let num = req.body.num;
    let bairro = req.body.bairro;
    let city = req.body.city;
    let est = req.body.est;
    let eventName = req.body.eventName;
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

    let imgEvent = req.file ? Buffer.from(req.file.buffer).toString('base64') : null;

    ReEvent.create({
        Nome_evento: eventName,
        Slug: slugify(eventName),
        endereco: enderEvent,
        cep: cep,
        LocalDoEvento: localEvento,
        numero: num,
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

router.get("/aboutEvent/:id", (req, res) => {
    let id = parseInt(req.params.id);
    ReEvent.findOne({ where: { id:id } }).then(event => {
        res.render("aboutEvent", {
            event:event
        });
    })
})

router.post("/deletEvent", (req, res) => {
    let id = req.body.id;
    if(!isNaN(id)){
        ReEvent.destroy({ where: {id:id} }).then(() => {
            res.redirect("/");
        }).catch(err => {
            window.alert(`Não foi possivel deletar esse evento`);
            console.log(`Não foi possivel deletar esse evento | erro | ${err}`)
        })
    }
})

router.get("/editEvent/:id", (req, res) => {
    let id = req.params.id;

    ReEvent.findOne({ where: { id:id } }).then(event => {
        res.render("editEvent", {
            event:event
        })
    })
})

router.post("/editEventSave", upload.single('imgEvent'), (req, res) => {
    let {
        id, enderEvent, cep, avRua, num, complemento, bairro, city, est,
        eventName, eventPago, aboutEvent, categorySelector, descriptionEvent,
        dtInit, dtEnd, timeInit, timeEnd, nameEventP, aboutEventP, responsability
    } = req.body;

    eventPago = eventPago === 'on' ? true : false;
    responsability = responsability === 'on' ? true : false;
    let imgEvent = req.file ? Buffer.from(req.file.buffer).toString('base64') : null;

    const updateData = {
        Nome_evento: eventName,
        Slug: slugify(eventName),
        endereco: enderEvent,
        cep: cep,
        LocalDoEvento: localEvento,
        numero: num,
        bairro: bairro,
        cidade: city,
        estado: est,
        imagem: imgEvent,
        dvPago: eventPago,
        assunto: aboutEvent,
        detalhesEvento: descriptionEvent,
        dataInicio: new Date(dtInit),
        dataFim: new Date(dtEnd),
        horaInicio: timeInit,
        horaFim: timeEnd,
        produtor: nameEventP,
        sobreProdutor: aboutEventP,
        termos: responsability,
        categoriaId: categorySelector
    };

    if (imgEvent) {
        updateData.imagem = imgEvent;
    }

    ReEvent.update(updateData, { where: { id: id } })
        .then(() => res.redirect("/"))
        .catch(err => {
            console.error(`Erro ao editar o evento: ${err}`);
            res.status(500).send("Erro ao editar o evento.");
        });
});

router.get("/eventsList", (req, res) => {
    events.findAll({ order: [ [ "ID","DESC" ] ] }).then(events => {
        res.render("eventsList", {
            events: events
        })
    })
})

module.exports = router;