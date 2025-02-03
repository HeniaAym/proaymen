const { poolPromise } = require('../config/db');

exports.createDonation = async (req, res) => {
    const { title, description, city, contactInfo } = req.body;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`INSERT INTO Donations (UserID, Title, Description, City, ContactInfo, CreatedAt, UpdatedAt) VALUES ('${userID}', '${title}', '${description}', '${city}', '${contactInfo}', GETDATE(), GETDATE())`);
        res.status(201).json({ message: 'Donation created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Donations`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDonation = async (req, res) => {
    const donationID = req.params.id;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`DELETE FROM Donations WHERE DonationID = '${donationID}' AND UserID = '${userID}'`);
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};