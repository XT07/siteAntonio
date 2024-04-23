const express = require("express");
const router = express.Router();

router.get("/logAdm", (req, res) => {
    res.render("login");
})

module.exports = router;