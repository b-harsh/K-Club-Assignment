const processImages = require('../services/imageprocessor');
const jobstore = require('../models/jobstore');

function enqueueJob(jobId, visits) {
  (async () => {
    try {
      for (const visit of visits) {
        for (const url of visits.image_url) {
          const result = await processImages(url);
          if (!result.success) {
            (jobstore[jobId].status = 'failed'),
              jobstore[jobId].error.push({
                store_id: visit.store_id,
                error: result.error,
              });
            return;
          }
        }
      }
      jobstore[jobId].status = 'completed';
    } catch (e) {
      (jobstore[jobId].status = 'failed'),
        jobstore[jobId].error.push({ error: e.message });
    }
  })();
}

module.exports = { enqueueJob };
