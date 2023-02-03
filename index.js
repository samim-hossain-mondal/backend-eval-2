const express = require('express');
const parse = require('csv-parse').parse;
const os = require('os');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: os.tmpdir() });
const router = require('./src/routes/index');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/save', upload.single('file'), (req, res) => {
  const data = fs.readFileSync('./input.csv', 'utf8');
  parse(data, (err, records) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ success: false, message: 'An error occurred' });
    }
    return res.json({ data: records });
  });
});

app.use('/api/save', router);

app.listen(port, () => console.log(`App listening on port ${port}!`));