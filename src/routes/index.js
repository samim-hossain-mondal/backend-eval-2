const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');

router.route('/:id')
  .get(controllers.getCompanyById);

router.route('/filter-by-sector')
  .get(controllers.getCompaniesBySector);

module.exports = router;