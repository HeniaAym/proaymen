const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Define your volunteer routes here
router.post('/', ensureAuthenticated, volunteerController.createVolunteer);
router.get('/', volunteerController.getVolunteers);
router.delete('/:id', ensureAuthenticated, volunteerController.deleteVolunteer);

module.exports = router;