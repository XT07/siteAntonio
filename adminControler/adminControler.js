const express = require("express");
const router = express.Router();
const users = require("./Reuser");
const events = require("../registerEvent/ReEvent");

router.get("/logAdm", (req, res) => {
    res.render("login");
})

router.get("/admPainel", (req, res) => {
    res.render("admPainel");
})

router.get("/eventsList", (req, res) => {
    events.findAll().then(events => {
        res.render("eventsList", {
            events: events
        })
    })
})

module.exports = router;