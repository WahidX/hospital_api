const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        min : 1000000000,       // 10 digit number
        max : 9999999999,
        reqired: true
    },
    reports:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
},{
    timestamps: true
});

// name and phone together primary key
patientSchema.index({ name: 1, phone: 1}, { unique: true });
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;