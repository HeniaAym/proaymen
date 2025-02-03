const { poolPromise } = require('../config/db');

exports.createVolunteer = async (req, res) => {
    const { name, skills, availability } = req.body;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`INSERT INTO Volunteers (UserID, Name, Skills, Availability, CreatedAt, UpdatedAt) VALUES ('${userID}', '${name}', '${skills}', '${availability}', GETDATE(), GETDATE())`);
        res.status(201).json({ message: 'Volunteer created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getVolunteers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Volunteers`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteVolunteer = async (req, res) => {
    const volunteerID = req.params.id;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`DELETE FROM Volunteers WHERE VolunteerID = '${volunteerID}' AND UserID = '${userID}'`);
        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};