const router = require('express').Router();
const controller = require('../controllers/index');

router.post('/save', controller.getData);
router.get('/companies', controller.getCompany);
router.put('/update', controller.updateCeo);

module.exports = router;