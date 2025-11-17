const express = require('express');
const { signUp, login } = require("../controller/auth");


const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.get("/test", (req, res) => {
    res.send("this is a test route");
});

module.exports = router;