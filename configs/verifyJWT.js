const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctors');


module.exports = async function(req, res, next){
    const token = req.header('Authorization');
    if(!token){ return res.status(401).send('Access Denied'); }

    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        let doctor = await Doctor.findById(verified._id);
        if(doctor){
            req.user = doctor;
            next();
        }
        else{
            return res.status(400).send("Invalid token");    
        }
    }
    catch(err){
        return res.status(400).send("Invalid token");
    }

}