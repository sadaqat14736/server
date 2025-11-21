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

async function login(req, res) {
    try {
        const { email, password } = req.body;

                if (!email || !password) {
            return res.status(400).send({
                status: 400,
                message: "Email or password is missing"
            });
        }

                const dbUser = await userModel.findOne({ email });
                console.log(dbUser, "here is a user");
        if (!dbUser) {
            return res.status(401).send({
                status: 401,
                message: "User not found"
            });
        }
                const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                status: 401,
                message: "Invalid password"
            });
        }
            const token = jwt.sign(
            {id: dbUser._id, email: dbUser.email, role: dbUser.role },
            process.env.JWTSECRETKEY,
            { expiresIn: "1d" }
        );
          console.log(token);

                res.cookie("jwtToken", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });

        res.send({
            status: 200,
            message: "Login successful",
            token,
            dbUser
            
        });

            } catch (err) {
        res.status(500).send({
            status: 500,
            message: "Server error",
            error: err.message
        });
    }
}
 
module.exports = { signUp, login };