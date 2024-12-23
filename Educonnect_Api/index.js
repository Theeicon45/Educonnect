import express from 'express';
import cors from 'cors';
import db from './dbConfig.js';
import connection from './dbConfig.js';

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
      preferredSchool,  // School name
      remarks 
  } = req.body;

  // Query to get School_ID based on the preferred school name
  const schoolQuery = 'SELECT School_ID FROM school WHERE School_Name = ?';

  db.query(schoolQuery, [preferredSchool], (err, schoolResult) => {
      if (err) {
          console.error('Error fetching school ID:', err);
          return res.status(500).json({ message: 'Error fetching school ID', error: err.message });
      }

      if (schoolResult.length === 0) {
          return res.status(404).json({ message: 'Preferred school not found' });
      }

      const schoolID = schoolResult[0].School_ID;

      // Now insert the application with the School_ID
      const sql = 'INSERT INTO application (Applicant_Name, Date_of_Birth, Gender, Grade_Level_Applied, Guardian_Name, Guardian_Contact, Previous_School, Application_Date, Preferred_School, Remarks, School_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      db.query(sql, [applicantName, dateOfBirth, gender, gradeLevelApplied, guardianName, guardianContact, previousSchool, applicationDate, preferredSchool, remarks, schoolID], (err, result) => {
          if (err) {
              console.error('Database insertion error:', err);
              return res.status(500).json({ message: 'Error submitting application', error: err.message });
          }
          res.status(201).json({ id: result.insertId, message: 'Application submitted successfully' });
      });
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

// // API Endpoint to get applications
// app.get('/api/applications', (req, res) => {
//     const sql = 'SELECT * FROM application';
//     connection.query(sql, (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error fetching applications' });
//       }
//       res.json(results); // Send the results back as JSON
//     });
//   });
  
//   // API Endpoint to update status
//   app.post('/api/updateStatus/:id', (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body; // Status can be 'Accepted' or 'Denied'
  
//     const sql = 'UPDATE application SET Status = ? WHERE id = ?';
//     connection.query(sql, [status, id], (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error updating status' });
//       }
//       res.json({ message: 'Status updated successfully' });
//     });
//   });

/////////////////////////////////////////////////status table///////////////////////////////////
app.post('/api/updateStatus/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updateStatusSQL = `
        UPDATE application 
        SET Status = ?, 
            Admission_Date = CASE WHEN ? = 'Accepted' THEN CURDATE() ELSE NULL END 
        WHERE Application_ID = ?
    `;

    connection.query(updateStatusSQL, [status, status, id], (err, result) => {
        if (err) {
            console.error('Error updating status and admission date:', err);
            return res.status(500).json({ error: 'Error updating status and admission date', details: err.message });
        }

        if (status === 'Accepted') {
            // Fetch application details for the accepted student, including the School_ID
            const fetchApplicationSQL = 'SELECT * FROM application WHERE Application_ID = ?';
            connection.query(fetchApplicationSQL, [id], (err, applicationResult) => {
                if (err) {
                    console.error('Error fetching application details:', err);
                    return res.status(500).json({ error: 'Error fetching application details', details: err.message });
                }

                if (applicationResult.length > 0) {
                    const application = applicationResult[0];
                    const {
                        Application_ID: studentID,
                        Applicant_Name: fullName,
                        Grade_Level_Applied: yearLevel,
                        Preferred_School: schoolName,
                        Guardian_Name: guardianName,
                        Guardian_Contact: guardianContact,
                    } = application;

                    // Get the School_ID from the Preferred_School (schoolName)
                    const getSchoolIDSQL = 'SELECT School_ID FROM school WHERE School_Name = ?';
                    connection.query(getSchoolIDSQL, [schoolName], (err, schoolResult) => {
                        if (err) {
                            console.error('Error fetching school details:', err);
                            return res.status(500).json({ error: 'Error fetching school details', details: err.message });
                        }

                        if (schoolResult.length > 0) {
                            const schoolID = schoolResult[0].School_ID;

                            // Insert into `student_record`
                            const insertStudentSQL = `
                                INSERT INTO student_record 
                                (Student_ID, School_ID, Full_Name, Enrollment_Year, Year_Level, Term_Average_Grade, Guardian_ID, Status)
                                VALUES (?, ?, ?, YEAR(CURDATE()), ?, 'N/A', ?, 'Active')
                            `;

                            const guardianID = Math.floor(Math.random() * 100000); // Generate a mock guardian ID

                            connection.query(
                                insertStudentSQL,
                                [studentID, schoolID, fullName, yearLevel, guardianID],
                                (err, studentInsertResult) => {
                                    if (err) {
                                        console.error('Error inserting into student_record:', err);
                                        return res.status(500).json({ error: 'Error inserting into student_record', details: err.message });
                                    }

                                    console.log('Student record created successfully:', studentInsertResult);
                                    res.json({ message: 'Status updated, admission date set, and student record created successfully' });
                                }
                            );
                        } else {
                            console.error('School not found for name:', schoolName);
                            return res.status(404).json({ error: 'School not found' });
                        }
                    });
                } else {
                    console.error('Application not found for ID:', id);
                    res.status(404).json({ error: 'Application not found' });
                }
            });
        } else {
            console.log('Status updated successfully for ID:', id);
            res.json({ message: 'Status updated successfully' });
        }
    });
});


  ///////////////////////////////////////////student management/////////////////////////
  app.get('/api/students', (req, res) => {
    const { search = '' } = req.query;
  
    const query = `
      SELECT * 
      FROM student_record 
      WHERE Full_Name LIKE ? 
      ORDER BY Full_Name ASC;
    `;
  
    connection.query(query, [`%${search}%`], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch students' });
      }
  
      res.json(rows);
    });
  });
  
  // Endpoint to update student record
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { Full_Name, Enrollment_Year, Year_Level, Status } = req.body;

  const sql = `
    UPDATE student_record 
    SET Full_Name = ?, Enrollment_Year = ?, Year_Level = ?, Status = ?
    WHERE Student_Record_ID = ?
  `;

  connection.query(sql, [Full_Name, Enrollment_Year, Year_Level, Status, id], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      return res.status(500).json({ error: 'Failed to update student' });
    }

    res.status(200).json({ message: 'Student updated successfully' });
  });
});

  
  
  
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
