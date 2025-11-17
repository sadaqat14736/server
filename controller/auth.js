const bcrypt = require("bcrypt");
const saltRounds = 10;

//UAEnJlzKmJEVeI9o      j$qK5f-bXgXfVMA     j$qK5f-bXgXfVMA
// mongodb+srv://sadaqat:<db_password>@cluster0.g3mjkkw.mongodb.net/?appName=Cluster0

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
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.send({
                status: 400,
                message: "Email or password is missing",
            });;
        }


        const fakeUser = {
            "email": "abc@gmail.com",
            "passwword": "12345",
        };

        if(email===fakeUser.email && password===fakeUser.password){
            return res.send({
                status: 200,
                message: "Login successful (simple version)",
            });
        }

        return res.send({
            status: 401,
            message: "Invalid email or password"
        });
    }catch(err){
        res.send({
            err,
            status: 500,
            message: "Server error",       
        })
    }
}

module.exports = { signUp, login };