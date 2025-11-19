const express = require('express');
const { signUp, login } = require("../controller/auth");
const authrization = require('../middleware/authentication');


const router = express.Router();

router.post("/signup", signUp);
router.post("/login",authrization, login);


router.get("/test", (req, res) => {
    res.send("this is a test route");
});

module.exports = router;