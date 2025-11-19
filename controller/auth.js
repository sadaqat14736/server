const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../db/userSchema")
const dotenv = require("dotenv");
const saltRounds = 10;

async function signUp(req, res) {


    try{
        // frontend sy data hasil karney k liye 
        const { firstName, lastName, email, password, role } = req.body;

        bcrypt.genSalt(saltRounds, function (err, salt){
            bcrypt.hash(password, salt, function (err, hashedPassword){
                const user = {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role,
                };


                const result = new userModel(user).save();
                res.send({
                    message: "Signup successfully  working with bcrypt!",
                    user,
                    status: 200,
                });
            });
        });

    }catch (err){
        res.send({
            err,
            message: "sorry! something went wrong in signupp or server is not responding"
        })
    }
}

async function login() {
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.send({
                status: 400,
            })
        }
    }
}

module.exports = { signUp, login };