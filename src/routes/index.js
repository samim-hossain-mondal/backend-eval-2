const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');

router.post('/save', controllers.addCompany);
router.get('/companies', controllers.getTopScoredCompanyBySector);
router.put('/update/:id', controllers.updateCompanyDetails);

module.exports = router;