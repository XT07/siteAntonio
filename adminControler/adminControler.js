const express = require("express");
const router = express.Router();
const users = require("./Reuser");

router.get("/logAdm", (req, res) => {
    res.render("login");
})

router.get("/admPainel", (req, res) => {
    res.render("admPainel");
})

router.get("/eventList", (req, res) => {
    
})

module.exports = router;