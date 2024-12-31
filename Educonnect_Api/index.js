import express from "express";
import cors from "cors";
import db from "./dbConfig.js";
import connection from "./dbConfig.js";
import bcrypt from "bcryptjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // use express.json() instead of bodyParser.json()

// Endpoint to create a new application record
app.post("/api/applications", (req, res) => {
  const {
    applicantName,
    secondName,
    dateOfBirth,
    gender,
    gradeLevelApplied,
    guardianName,
    guardianContact,
    previousSchool,
    applicationDate,
    preferredSchool, // School name
    remarks,
  } = req.body;

  // Query to get School_ID based on the preferred school name
  const schoolQuery = "SELECT School_ID FROM school WHERE School_Name = ?";

  db.query(schoolQuery, [preferredSchool], (err, schoolResult) => {
    if (err) {
      console.error("Error fetching school ID:", err);
      return res
        .status(500)
        .json({ message: "Error fetching school ID", error: err.message });
    }

    if (schoolResult.length === 0) {
      return res.status(404).json({ message: "Preferred school not found" });
    }

    const schoolID = schoolResult[0].School_ID;

    // Now insert the application with the School_ID
    const sql = `
  INSERT INTO application (
    Applicant_Name, 
    Second_Name, 
    Date_of_Birth, 
    Gender, 
    Grade_Level_Applied, 
    Guardian_Name, 
    Guardian_Contact, 
    Previous_School, 
    Application_Date, 
    Preferred_School, 
    Remarks, 
    School_ID
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(
      sql,
      [
        applicantName,
        secondName,
        dateOfBirth,
        gender,
        gradeLevelApplied,
        guardianName,
        guardianContact,
        previousSchool,
        applicationDate,
        preferredSchool,
        remarks,
        schoolID,
      ],
      (err, result) => {
        if (err) {
          console.error("Database insertion error:", err);
          return res.status(500).json({
            message: "Error submitting application",
            error: err.message,
          });
        }
        res.status(201).json({
          id: result.insertId,
          message: "Application submitted successfully",
        });
      }
    );
  });
});

app.get("/api/schools", (req, res) => {
  const sql = "SELECT * FROM school"; // Adjust the table name as necessary
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});
// Endpoint to retrieve all applications
app.get("/api/applications", (req, res) => {
  const sql = "SELECT * FROM application";

  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving applications", error: err.message });
    }
    res.json(results);
  });
});
// Endpoint to handle login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Query to fetch the user based on the username
  const sql = "SELECT * FROM user_credentials WHERE Username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    // If no user is found, return an error
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Extract the user from the query result
    const user = results[0];
    const storedHash = user.Password_Hash; // The hashed password from the database

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, storedHash);

    // If the passwords do not match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If passwords match, proceed with the login
    console.log("User role from database:", user.Role);
    res.status(200).json({ role: user.Role });
  });
});

/////////////////////////////////////////////////Admission Management///////////////////////////////////
app.post("/api/updateStatus/:id", (req, res) => {
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
      console.error("Error updating status and admission date:", err);
      return res.status(500).json({
        error: "Error updating status and admission date",
        details: err.message,
      });
    }

    if (status === "Accepted") {
      // Fetch application details for the accepted student
      const fetchApplicationSQL =
        "SELECT * FROM application WHERE Application_ID = ?";
      connection.query(fetchApplicationSQL, [id], (err, applicationResult) => {
        if (err) {
          console.error("Error fetching application details:", err);
          return res.status(500).json({
            error: "Error fetching application details",
            details: err.message,
          });
        }

        if (applicationResult.length > 0) {
          const application = applicationResult[0];
          const {
            Application_ID: studentID,
            Applicant_Name: studentName,
            Grade_Level_Applied: classGrade,
          } = application;

          // Insert into fees table
          const insertFeesSQL = `
            INSERT INTO fees 
            (StudentID, StudentName, ClassGrade, FeeType, AmountDue, AmountPaid, DueDate, PaymentStatus)
            VALUES (?, ?, ?, 'Tuition Fee', 35000, 0, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'Unpaid')
          `;

          connection.query(
            insertFeesSQL,
            [studentID, studentName, classGrade],
            (err, feesResult) => {
              if (err) {
                console.error("Error inserting into fees table:", err);
                return res.status(500).json({
                  error: "Error inserting into fees table",
                  details: err.message,
                });
              }

              console.log("Fees record created successfully:", feesResult);
              res.json({
                message:
                  "Status updated, admission date set, and fees record created successfully.",
              });
            }
          );
        } else {
          res.status(404).json({ error: "Application not found" });
        }
      });
    } else {
      console.log("Status updated successfully for ID:", id);
      res.json({ message: "Status updated successfully." });
    }
  });
});

///////////////////////////////////////////student management/////////////////////////
app.get("/api/students", (req, res) => {
  const { search = "" } = req.query;

  const query = `
        SELECT Student_Record_ID, First_Name, Second_Name, Enrollment_Year, Year_Level, Status
        FROM student_record 
        WHERE First_Name LIKE ? OR Second_Name LIKE ?  /* Search by first and second name */
        ORDER BY First_Name ASC;
      `;

  connection.query(query, [`%${search}%`, `%${search}%`], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch students" });
    }

    res.json(rows);
  });
});

// Endpoint to update student record
app.put("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const { First_Name, Second_Name, Enrollment_Year, Year_Level, Status } =
    req.body;

  const sql = `
      UPDATE student_record 
      SET First_Name = ?, Second_Name = ?, Enrollment_Year = ?, Year_Level = ?, Status = ? 
      WHERE Student_Record_ID = ?
    `;

  connection.query(
    sql,
    [First_Name, Second_Name, Enrollment_Year, Year_Level, Status, id],
    (err, result) => {
      if (err) {
        console.error("Error updating student:", err);
        return res.status(500).json({ error: "Failed to update student" });
      }

      res.status(200).json({ message: "Student updated successfully" });
    }
  );
});

//////////////////////////////TEACHER CREATION/////////////////////////////////////////////

app.post("/api/teachers", async (req, res) => {
  const {
    First_Name,
    Last_Name,
    Email,
    Phone_Number,
    Subject_Specialty,
    School_ID,
    Employment_Status,
    Hire_Date,
    Status,
  } = req.body;

  // Insert teacher data into the teacher table
  const sql = `
    INSERT INTO teacher (
      First_Name, Last_Name, Email, Phone_Number, Subject_Specialty, 
      School_ID, Employment_Status, Hire_Date, Status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    First_Name,
    Last_Name,
    Email,
    Phone_Number,
    Subject_Specialty,
    School_ID,
    Employment_Status,
    Hire_Date,
    Status,
  ];

  try {
    const [teacherResult] = await db.promise().query(sql, values);

    // Teacher ID from the teacher table
    const teacherID = teacherResult.insertId;

    // Generate default username and password for the teacher
    const username = `${First_Name.toLowerCase()} ${Last_Name.toLowerCase()}`;
    const defaultPassword = "password123"; // Default password (you can change this)
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Insert into user_credentials table
    const insertCredentialsSQL = `
       INSERT INTO user_credentials (Username, Password_Hash, Role, Email)
      VALUES (?, ?, ?, ?)
    `;
    const role = "teacher"; // Role for teacher
    const credentialsValues = [username, hashedPassword, role, Email];
    await db.promise().query(insertCredentialsSQL, credentialsValues);

    // Respond with success
    res.status(201).send({ message: "Teacher added successfully", teacherID });
  } catch (err) {
    console.error("Error inserting teacher:", err);
    res
      .status(500)
      .send({ message: "Error adding teacher", error: err.message });
  }
});

//////////////////////Teacher Table//////////////////////
app.get("/api/teachers", (req, res) => {
  const sql = `
      SELECT t.*, s.School_Name 
      FROM teacher t 
      JOIN school s ON t.School_ID = s.School_ID`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.put("/api/teachers/:id", (req, res) => {
  const { id } = req.params;
  const {
    First_Name,
    Last_Name,
    Email,
    Phone_Number,
    Subject_Specialty,
    Status,
  } = req.body;
  const sql = `
      UPDATE teacher 
      SET First_Name = ?, Last_Name = ?, Email = ?, Phone_Number = ?, Subject_Specialty = ?, Status = ? 
      WHERE Teacher_ID = ?`;
  db.query(
    sql,
    [First_Name, Last_Name, Email, Phone_Number, Subject_Specialty, Status, id],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ message: "Teacher updated successfully" });
    }
  );
});
/////////////////////////////////////Fees Table////////////////////////
app.get("/api/fees", (req, res) => {
  const query = "SELECT * FROM Fees";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
    res.json(results);
    console.log(results);
  });
});

app.patch("/api/updateFeeStatus/:id", (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    return res.status(400).json({ error: "Payment status is required" });
  }

  const query = "UPDATE Fees SET PaymentStatus = ? WHERE FeeID = ?";
  db.query(query, [paymentStatus, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to update fee status" });
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fee not found" });
    }

    res.json({ message: "Status updated successfully" });
  });
});

//////////////////////////// Finance data graph////////////////////////////////

app.get("/api/financeData", (req, res) => {
  const financeQuery = `
    SELECT
      MONTHNAME(DueDate) AS monthName,
      SUM(AmountDue) * CASE 
        WHEN MONTH(DueDate) = 1 THEN 0.33
        WHEN MONTH(DueDate) = 2 THEN 0.67
        WHEN MONTH(DueDate) = 3 THEN 0.95
        WHEN MONTH(DueDate) = 9 THEN 0.33
        WHEN MONTH(DueDate) = 10 THEN 0.67
        WHEN MONTH(DueDate) = 11 THEN 0.95
        ELSE 0
      END AS Expected,
      SUM(AmountPaid) AS Paid
    FROM fees
    WHERE MONTH(DueDate) IN (1, 2, 3, 9, 10, 11)
    GROUP BY MONTH(DueDate)
    ORDER BY FIELD(MONTHNAME(DueDate), 'September', 'October', 'November', 'January', 'February', 'March')
  `;

  connection.query(financeQuery, (err, result) => {
    if (err) {
      console.error("Error fetching finance data:", err);
      return res.status(500).json({ error: "Error fetching finance data" });
    }

    // Map results into the required format
    const financeData = result.map(row => ({
      name: row.monthName,
      Expected: parseFloat(row.Expected || 0),
      Paid: parseFloat(row.Paid || 0),
    }));

    res.json(financeData);
  });
});


////////////ExpenseChart///////////////
app.get("/api/expenseSummary", (req, res) => {
  const expenseSummaryQuery = `
    SELECT ExpenseCategory, SUM(Amount) AS totalAmount
    FROM expenses
    WHERE YEAR(ExpenseDate) = YEAR(CURDATE())
    GROUP BY ExpenseCategory
  `;

  connection.query(expenseSummaryQuery, (err, result) => {
    if (err) {
      console.error("Error fetching expense summary:", err);
      return res.status(500).json({ error: "Error fetching expense summary" });
    }

    const summary = result.map(row => ({
      name: row.ExpenseCategory,
      value: parseFloat(row.totalAmount),
    }));

    res.json(summary);
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
