const Patient = require('../models/patients');
const Report = require('../models/reports');
const Doctor = require('../models/doctors');


module.exports = {
    createUser : async function(req, res) {
        try{
            // Check if the patient is registered or not
            let patient = await Patient.findOne({
                name: req.body.name,
                phone: req.body.phone
            });
            
            // Patient already registered so fetching all reports of that patients
            if(patient) {
                return res.redirect(`/patients/${ patient._id }/all_reports`);
            }

            let newUser = await Patient.create({
                name: req.body.name,
                phone: req.body.phone
            });

            return res.status(200).json({
                message: "Patient registered successfully",
                data: {
                    patient_id: newUser._id
                }
            });
        }
        catch(err){
            console.log("Err: ",err);
            return res.json(500, {
                message: "Error: "+err
            });
        }
    },

    createReport: async function (req, res) {
        let id = req.params.id;

        let patient = await Patient.findById(req.params.id);
        if(!patient){ return res.status(400).send('Patient not found'); }

        let newReport = await Report.create({
            created_by: req.user,
            status: req.body.status,
            owner: patient._id
        });

        patient.reports.push(newReport);
        patient.save();
        
        return res.status(200).send('Report generated');
    },

    allReports: async function (req, res) {
        try{
            // Checking if patient parameter is correct
            let patient = await Patient.findById(req.params.id);
            if(!patient){ return res.status(404).send('Patient not found'); }

            // Finding all the reports of that patient( by default it gives oldest to newest )
            let reports = await Report.find({ 'owner': req.params.id });

            // returning the patient's info & reports 
            return res.status(200).json({
                message: "Patient already Registered!",
                data : {
                    patient: patient,
                    all_reports: reports
                }
            });
        }
        catch(err){
            return res.status(501).send(`Internal Server error ${err}`);
        }
    }
};