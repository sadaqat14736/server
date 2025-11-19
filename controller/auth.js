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


async function login(req, res,) {
  // destructure
  try {
    const { email, password } = req.body;

    const dbUser = await userModel.findOne({ email });
    console.log(dbUser, "here is a user");

    // Load hash from your password DB.
    bcrypt.compare(password, dbUser.password, function (err, result) {
      // result == true

      if (result) {
        console.log(process.env.JWTSECRETKEY, "process.env.JWTSECRETKEY");
        let token = jwt.sign(
          {
            email: dbUser.email,
            firstName: dbUser.firstName,
            "last name": dbUser.lastName,
            role: dbUser.role,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: "1d" }
        );
        console.log(token);
        res.cookie("jwtToken", token, {
          httpOnly: true,
          maxAge: "1d", // 1 day in milliseconds
        });
        res.send({
          status: 200,
          message: "user login successfully",
          token,
        });
      }
    });
  } catch (err) {
    res.send({
      err,
      status: 500,
      message: "sorry! server is not responding",
    });
  }
}

 
module.exports = { signUp, login };