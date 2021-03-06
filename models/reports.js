const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    status: {
        type: String,
        enum : ['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'],
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;