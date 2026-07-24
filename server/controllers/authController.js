const bcrypt = require("bcrypt");

const db = require("../config/db");

exports.register = async (req, res) => {

    try{

        const { username, email, password } = req.body;

        if(!username || !email || !password){

            return res.status(400).json({

                message:"All fields are required"

            });

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const sql = `
        INSERT INTO users(username,email,password)
        VALUES(?,?,?)
        `;

        db.query(

            sql,

            [username,email,hashedPassword],

            (err,result)=>{

                if(err){

                    return res.status(500).json(err);

                }

                res.status(201).json({

                    message:"User Registered Successfully"

                });

            }

        );

    }

    catch(error){

        res.status(500).json(error);

    }

};

const jwt = require("jsonwebtoken");

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required"
        });

    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user.id,

                username: user.username,

                email: user.email

            }

        });

    });

};