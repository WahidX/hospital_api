const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        reqired: true,
        unique: true
    },
    reports:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reports'
        }
    ]
},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;