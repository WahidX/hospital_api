const express = require('express');
const router = express.Router();
const reports_controller = require('../controllers/reports_controller');

router.get('/:status', reports_controller.fetchReports);

module.exports = router;