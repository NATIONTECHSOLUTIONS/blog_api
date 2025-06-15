"use strict";

const router = require("express").Router();
/* Get home page.*/
router.get('/', (req, res) =>{
    res.json({
        message: "🌈🏳️‍🌈✨🤞🌍🌎🌏✨🌦️🏳️‍🌈🏳️‍🌈 ",
    });
});

module.exports = router;
