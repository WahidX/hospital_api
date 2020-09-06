const Patient = require('../models/patients');
const Report = require('../models/reports');

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

            // Creating new patient
            let newUser = await Patient.create({
                name: req.body.name,
                phone: req.body.phone
            });

            // Returning new user
            return res.status(200).json({
                message: "Patient registered successfully",
                data: {
                    patient_id: newUser
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
        // Checking if patient parameter is correct
        let patient = await Patient.findById(req.params.id);
        if(!patient){ return res.status(404).send('Patient not found'); }

        // Creating the report
        let newReport = await Report.create({
            created_by: req.user,       // logged in doctor
            status: req.body.status,    // status from form data
            owner: patient._id          // patient gotten from the params
        });

        // Pushing entry in patient's report array
        patient.reports.push(newReport);
        patient.save();
        
        // Returning the generated report
        return res.status(200).json({
            message: 'Report generated',
            data:{
                newReport: newReport
            }
        });
    },

    allReports: async function (req, res) {
        try{
            // Checking if patient parameter is correct
            let patient = await Patient.findById(req.params.id);
            if(!patient){ return res.status(404).send('Patient not found'); }

            // Gathering all the reports of that patient( by default it gives oldest to newest )
            let reports = await Patient.findById(req.params.id).populate({
                path: 'reports'
            });

            // returning the patient's info & reports 
            return res.status(200).json({
                message: "Patient already Registered!",
                data : {
                    all_reports: reports
                }
            });
        }
        catch(err){
            return res.status(501).send(`Internal Server error ${err}`);
        }
    }
};