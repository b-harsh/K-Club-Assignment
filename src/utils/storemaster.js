const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const storeMaster = {};
const filePath = path.join(__dirname, '../../store_master.csv');

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    storeMaster[row.store_id] = {
      store_name: row.store_name,
      area_code: row.area_code,
    };
  })
  .on('end', () => {
    console.log('Store Master Loaded');
  });

module.exports = storeMaster;
