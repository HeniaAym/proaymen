const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Define your patient routes here
router.post('/', ensureAuthenticated, patientController.createPatient);
router.get('/', patientController.getPatients);
router.delete('/:id', ensureAuthenticated, patientController.deletePatient);

module.exports = router;