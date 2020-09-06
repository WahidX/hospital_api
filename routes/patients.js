const express = require('express');
const router = express.Router();
const patients_controller = require('../controllers/patients_controller');
const verifyJWT = require('../configs/verifyJWT');

router.post('/register', verifyJWT, patients_controller.createUser);
router.post('/:id/create_report', verifyJWT, patients_controller.createReport);
router.get('/:id/all_reports', patients_controller.allReports);

module.exports = router;