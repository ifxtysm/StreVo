const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/auth");

router.get("profile", authenticateToken, (req, res) => {

    res.json({

        message: "Welcome to StreVo!",

        user: req.user

    });

});

module.exports = router;