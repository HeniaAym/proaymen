const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.post('/', ensureAuthenticated, donationController.createDonation);
router.get('/', donationController.getDonations);
router.delete('/:id', ensureAuthenticated, donationController.deleteDonation);

module.exports = router;