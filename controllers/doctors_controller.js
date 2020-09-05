const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.createSession = async function(req, res){
    try{
        let doctor = await Doctor.findOne({username: req.body.username});

        let p1 = doctor.password;
        let p2 = req.body.password;


        if(!doctor || p1!=p2){
            return res.json(422, {
                message: "Incorrect username or password"
            });
        }

        return res.json(200, {
            message: "Signed in successfully!",
            data: {
                token: jwt.sign(doctor.toJSON(), process.env.SECRET_KEY, {expiresIn: '10000'})
            }
        });
    }
    catch(err){
        console.log("Err: ",err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}