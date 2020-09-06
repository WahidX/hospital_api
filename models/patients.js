const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
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

patientSchema.index({ name: 1, phone: 1}, { unique: true });
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;