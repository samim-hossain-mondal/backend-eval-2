const express = require('express');
const router = require('./src/routes/company');
const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});