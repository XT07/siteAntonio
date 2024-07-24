const express = require("express");
const router = express.Router();
const users = require("../registerUser/User");

router.get("/logAdm", (req, res) => {
    res.render("login");
})

router.get("/admPainel", (req, res) => {
    res.render("admPainel");
})

module.exports = router;