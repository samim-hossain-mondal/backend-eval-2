const fs = require('fs');
const pg = require('pg');
const pool = new pg.Pool();
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('input.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    csvData.shift();
    const query =
      'INSERT INTO companyDatabase (company_id, company_sector) VALUES ($1, $2)';

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log('inserted ' + res.rowCount + ' row:', row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);