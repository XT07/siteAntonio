const express = require("express");
const router = express.Router();

router.get("/registerEvent", (req, res) => {
    res.render("registerEvent");
})

router.post("/reEventSave", (req, res) => {
    
})

module.exports = router;