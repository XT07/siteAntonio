const express = require("express");
const ReEvent = require("./ReEvent");
const router = express.Router();
const slugify = require("slugify");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 70 * 1024 }});
const events = require("./ReEvent");
const category = require("../adminControler/categoryControler/Category");
const cidade = require("../adminControler/cidadeControler/Cidade");
const est = require("../adminControler/estadoControler/Estado");
const auth = require("../midleware/midleware");

router.get("/registerEvent", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }else if(req.session.user != undefined){
        conf = 2;        
    }else {
        conf = 0;
    }

    category.findAll().then(category => {
        cidade.findAll().then(cidades => {
            est.findAll().then(est => {
                res.render("registerEvent", {
                    category: category,
                    cidades: cidades,
                    est: est,
                    conf:conf
                });
            })
        })
    })
})

router.post("/reEventSave", auth, upload.single('imgEvent'), (req, res) => {
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
    let descriptionEvent = req.body.descriptionEvent;
    let dtInit = req.body.dtInit;
    let dtEnd = req.body.dtEnd;
    let timeInit = req.body.timeInit;
    let timeEnd = req.body.timeEnd;
    let nameEventP = req.body.nameEventP;
    let aboutEventP = req.body.aboutEventP;
    let responsability = req.body.responsability === 'on' ? true : false;
    let category = req.body.category;
    let link = req.body.lin;
    let whatsapp = req.body.whatsapp;

    let imgEvent = req.file ? Buffer.from(req.file.buffer).toString('base64') : null;

    ReEvent.create({
        Nome_evento: eventName,
        Slug: slugify(eventName),
        endereco: enderEvent,
        cep: cep,
        LocalDoEvento: localEvento,
        numero: num,
        bairro: bairro,
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
        categoriaId: category,
        link: link,
        whatsapp: whatsapp,
        cidadeId: city
    }).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(`Erro ao registrar o evento | erro | ${err}`);
    })
})

router.get("/aboutEvent/:id", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }else if(req.session.user != undefined){
        conf = 2;        
    }else {
        conf = 0;
    }

    let id = parseInt(req.params.id);
    ReEvent.findOne({ where: { id:id } }).then(event => {
        res.render("aboutEvent", {
            event:event,
            conf:conf
        });
    })
})

router.post("/deletEvent", auth, (req, res) => {
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

router.get("/editEvent/:id", auth, (req, res) => {
    let id = req.params.id;

    ReEvent.findOne({ where: { id:id }, include: [ { model: category } ] }).then(event => {
        cidade.findAll().then(cidade => {
            res.redirect("editEvent", {
                event: event,
                cidade: cidade
            })
        })
    })
})

router.post("/editEventSave", auth, upload.single('imgEvent'), (req, res) => {
    let {
        id, enderEvent, cep, num, bairro, city, est,
        eventName, eventPago, aboutEvent, descriptionEvent,
        dtInit, dtEnd, timeInit, timeEnd, nameEventP, aboutEventP, responsability, category,
        link, whatsapp
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
        categoriaId: category,
        link: link,
        whatsapp: whatsapp,
        cidadeId: city
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

router.get("/eventsList", auth, (req, res) => {
    let conf = 0;

    if(req.session.ad != undefined){
        conf = 1;
    }else if(req.session.user != undefined){
        conf = 2;        
    }else {
        conf = 0;
    }

    events.findAll({ order: [ [ "ID","DESC" ] ] }).then(events => {
        res.render("eventsList", {
            events: events,
            conf:conf
        })
    })
})

module.exports = router;