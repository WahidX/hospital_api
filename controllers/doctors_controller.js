const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();



module.exports = {
    createSession : async function(req, res){
        try{
            let doctor = await Doctor.findOne({email: req.body.email});

            if (doctor){
                const passValidity = await bcrypt.compare(req.body.password, doctor.password);
                if(passValidity){
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
                message: "Internal Server Error"+err
            });
        }
    },

    createUser : async function(req, res) {
        try{
            let user = await Doctor.findOne({email: req.body.email});
            if(user) return res.status(400).send('Email already exists');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            let newUser = await Doctor.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });

            return res.status(200).send("User created, you can login now.");
        }
        catch(err){
            console.log("Err: ",err);
            return res.json(500, {
                message: "Internal Server Error"+err
            });
        }
    }
};