const { poolPromise } = require('../config/db');

exports.createPatient = async (req, res) => {
    const { name, description, contactInfo } = req.body;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`INSERT INTO Patients (UserID, Name, Description, ContactInfo, CreatedAt, UpdatedAt) VALUES ('${userID}', '${name}', '${description}', '${contactInfo}', GETDATE(), GETDATE())`);
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(`SELECT * FROM Patients`);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePatient = async (req, res) => {
    const patientID = req.params.id;
    const userID = req.user.UserID;

    try {
        const pool = await poolPromise;
        await pool.query(`DELETE FROM Patients WHERE PatientID = '${patientID}' AND UserID = '${userID}'`);
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};