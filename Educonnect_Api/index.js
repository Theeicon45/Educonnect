import express from 'express';
import cors from 'cors';
import db from './dbConfig.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // use express.json() instead of bodyParser.json()

// Endpoint to create a new application record
app.post('/api/applications', (req, res) => {
    const { 
        applicantName, 
        dateOfBirth, 
        gender, 
        gradeLevelApplied, 
        guardianName, 
        guardianContact, 
        previousSchool, 
        applicationDate, 
        preferredSchool,
        remarks 
    } = req.body;

    const sql = 'INSERT INTO application (Applicant_Name, Date_of_Birth, Gender, Grade_Level_Applied, Guardian_Name, Guardian_Contact, Previous_School, Application_Date, Preferred_School, Remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';


    db.query(sql, [applicantName, dateOfBirth, gender, gradeLevelApplied, guardianName, guardianContact, previousSchool, applicationDate, preferredSchool, remarks], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Error submitting application', error: err.message });
        }
        res.status(201).json({ id: result.insertId, message: 'Application submitted successfully' });
    });
});

app.get('/api/schools', (req, res) => {
    const sql = 'SELECT * FROM school'; // Adjust the table name as necessary
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});
// Endpoint to retrieve all applications
app.get('/api/applications', (req, res) => {
    const sql = 'SELECT * FROM application';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving applications', error: err.message });
        }
        res.json(results);
    });
});
// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM user_credentials WHERE Username = ? AND password_Hash = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Extract the user role
        const user = results[0];
        console.log("User role from database:", user.Role);
        res.status(200).json({ role: user.Role });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
