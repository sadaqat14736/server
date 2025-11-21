const express = require('express');
const { signUp, login } = require("../controller/auth");
const authrization = require('../middleware/authentication');


const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login); // ✅ No middleware here
router.get("/home", authrization, (req, res) => {
    res.send({
        status: 200,
        message: "Welcome! You are authorized",
        user: req.user
    });
});

router.get("/test", (req, res) => {
    res.send("this is a test route");
});

module.exports = router;