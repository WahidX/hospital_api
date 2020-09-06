const Report = require('../models/reports');


module.exports = {
    fetchReports : async function(req, res){
        try{
            let all_reports = await Report.find({'status':req.params.status});
            return res.status(200).json(all_reports);
        }
        catch(err){
            console.log(err);
            return res.status(404).send('Internal Server Error');
        }
    }
    
}
