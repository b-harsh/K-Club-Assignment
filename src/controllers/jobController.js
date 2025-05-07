const jobstore = require('../models/jobstore');
const storeMaster=require('../utils/storemaster');

const counter = 1;
exports.submitJob() = async(req , res)=>{
    const {count , visits} = req.body;
    if(!count || !visits || count != visits.length){
        return res.status(400).json({error : "Invalid input: count mismatch or missing fields"});
    }

    for(const visit of visits){
        if(!storeMaster[visit.store_id]){
            return res.status(400).json({error: `Invalid store_id: ${visit.store_id}`});
        }
    }
   
   const jobId = counter++;
   jobstore[jobId] = {status : 'ongoing', error: [] , visits}

   enqueueJob(jobId , visits);
   return res.status(200).json({job_id: jobId});
};


exports.getStatus = (req , res)=>{
    const {jobId} = req.query;
    if(!jobId || !jobstore[jobId]){
        return res.status(400).json({});
    }

    const {status , error} = jobstore[jobId];
    const response = {job_id : jobId , status};
    if(status=='failed')response.error = error;
    return res.status(200).json(response);
}