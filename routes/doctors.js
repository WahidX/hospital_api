const express = require('express');
const router = express.Router();
const doctor_controller = require('../controllers/doctors_controller');


router.post('/register',doctor_controller.createUser);
router.post('/login',doctor_controller.createSession);


module.exports = router;