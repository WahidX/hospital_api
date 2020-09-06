const mongoose = require('mongoose');
const doctorScheama = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorScheama);
module.exports = Doctor;