const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();         // To set env variables for the project



module.exports = {
    createSession : async function(req, res){
        try{
            // Finding entry with the provided email
            let doctor = await Doctor.findOne({email: req.body.email});

            if (doctor){
                // Checking password( using bcrypt cause we've hashed it in DB )
                const passValidity = await bcrypt.compare(req.body.password, doctor.password);
                
                if(passValidity){
                    // Successful login, will be sending a jwt token also
                    return res.status(200).json({       
                        message: "Signed in successfully!",
                        data: {
                            token: jwt.sign({ _id: doctor._id }, process.env.SECRET_KEY)
                        }
                    });
                }
            }

            return res.json(422, {
                message: "Incorrect username or password"
            });
            
        }
        catch(err){
            console.log("Err: ",err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
    },

    createUser : async function(req, res) {
        try{
            // Searching if any user present with this email
            let user = await Doctor.findOne({email: req.body.email});
            if(user) return res.status(400).send('Email already exists');

            // Hashing the given password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Creating entry for the doctor
            let newUser = await Doctor.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            // Returning successful message
            return res.status(200).send({
                message: "User created, you can login now."
            });
        }
        catch(err){
            console.log("Err: ",err);
            return res.json(500, {
                message: "Internal Server Error"+err
            });
        }
    }
};