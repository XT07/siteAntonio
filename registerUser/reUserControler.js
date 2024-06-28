const express = require("express");
const router = express.Router();

router.get("/registerUser", (req, res) => {
    res.render("registerUser");
})

module.exports = router;