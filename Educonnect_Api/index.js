import express from "express";
import cors from "cors";
import db from "./dbConfig.js";
import connection from "./dbConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./authenticateToken.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import updateTeacherProfileAPI from "./update-teacher-profile.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // use express.json() instead of bodyParser.json()

// Protectiom/////////////////////////////////////////////////////////

app.use("/api/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

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

const SECRET_KEY = "your-secret-key"; // Replace with a strong secret key

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Query to fetch the user based on the username
  const sql = "SELECT * FROM user_credentials WHERE Username = ?";
  connection.query(sql, [username], async (err, results) => {
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

    // If passwords match, create a JWT token
    const payload = {
      userId: user.User_ID, // Assuming you have User_ID in your database
      role: user.Role, // Assuming you have Role in your database
    };

    // Create the JWT token with the payload and secret key
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // Token expires in  24hours

    // Send the token and role in the response
    res.status(200).json({
      message: "Login successful",
      token: token, // Send the JWT token in the response
      role: user.Role, // Include the user's role in the response
    });
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
            Applicant_Name: firstName,
            Second_Name: secondName, // Directly use the Second_Name field from the application
            Grade_Level_Applied: yearLevel,
            School_ID: schoolID, // Assuming School_ID exists in the application table
          } = application;

          // Generate email address
          const email = `${firstName.toLowerCase()}.${secondName
            .toLowerCase()
            .replace(/\s+/g, "")}@mail.com`;

          // Insert into student_record table
          const insertStudentSQL = `
            INSERT INTO student_record 
            (Student_ID, School_ID, First_Name, Second_Name, Enrollment_Year, Year_Level, Term_Average_Grade, Guardian_ID, Status)
            VALUES (?, ?, ?, ?, YEAR(CURDATE()), ?, 'N/A', ?, 'Active')
          `;
          const guardianID = Math.floor(Math.random() * 100000); // Mock guardian ID
          connection.query(
            insertStudentSQL,
            [studentID, schoolID, firstName, secondName, yearLevel, guardianID],
            (err, studentInsertResult) => {
              if (err) {
                console.error("Error inserting into student_record:", err);
                return res.status(500).json({
                  error: "Error inserting into student_record",
                  details: err.message,
                });
              }

              // Insert into fees table
              const insertFeesSQL = `
                INSERT INTO fees 
                (StudentID, StudentName, ClassGrade, FeeType, AmountDue, AmountPaid, DueDate, PaymentStatus)
                VALUES (?, ?, ?, 'Tuition Fee', 35000, 0, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'Unpaid')
              `;
              connection.query(
                insertFeesSQL,
                [studentID, `${firstName} ${secondName}`, yearLevel],
                (err, feesResult) => {
                  if (err) {
                    console.error("Error inserting into fees table:", err);
                    return res.status(500).json({
                      error: "Error inserting into fees table",
                      details: err.message,
                    });
                  }

                  // Insert into user_credentials table
                  const username = `${firstName.toLowerCase()}.${secondName
                    .toLowerCase()
                    .replace(/\s+/g, "")}`;
                  const defaultPassword = "password123"; // Default password
                  bcrypt.hash(defaultPassword, 10, (err, hashedPassword) => {
                    if (err) {
                      console.error("Error hashing password:", err);
                      return res.status(500).json({
                        error: "Error creating user credentials",
                        details: err.message,
                      });
                    }

                    const insertCredentialsSQL = `
                      INSERT INTO user_credentials 
                      (Username, Password_Hash, Role, Email)
                      VALUES (?, ?, 'student', ?)
                    `;
                    connection.query(
                      insertCredentialsSQL,
                      [username, hashedPassword, email], // Use generated email here
                      (err, credentialsResult) => {
                        if (err) {
                          console.error(
                            "Error inserting into user_credentials:",
                            err
                          );
                          return res.status(500).json({
                            error: "Error inserting into user_credentials",
                            details: err.message,
                          });
                        }

                        // Get the User_ID of the inserted student
                        const getUserIDSQL = `
                          SELECT User_ID FROM user_credentials WHERE Username = ? LIMIT 1
                        `;
                        connection.query(
                          getUserIDSQL,
                          [username],
                          (err, userResult) => {
                            if (err) {
                              console.error("Error fetching user ID:", err);
                              return res.status(500).json({
                                error: "Error fetching user ID",
                                details: err.message,
                              });
                            }

                            if (userResult.length > 0) {
                              const userID = userResult[0].User_ID;

                              // Update student_record with the User_ID
                              const updateStudentSQL = `
                                UPDATE student_record 
                                SET User_ID = ? 
                                WHERE Student_ID = ?
                              `;
                              connection.query(
                                updateStudentSQL,
                                [userID, studentID],
                                (err, updateResult) => {
                                  if (err) {
                                    console.error(
                                      "Error updating student record with User_ID:",
                                      err
                                    );
                                    return res.status(500).json({
                                      error:
                                        "Error updating student record with User_ID",
                                      details: err.message,
                                    });
                                  }

                                  res.json({
                                    message:
                                      "Status updated, student record, fees record, and user credentials created successfully.",
                                  });
                                }
                              );
                            } else {
                              res.status(500).json({
                                error:
                                  "User credentials were created, but User_ID could not be retrieved.",
                              });
                            }
                          }
                        );
                      }
                    );
                  });
                }
              );
            }
          );
        } else {
          console.log("Application not found for ID:", id);
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

    // Get the User_ID of the inserted teacher from user_credentials table
    const getUserIDSQL = `
      SELECT User_ID FROM user_credentials WHERE Username = ? LIMIT 1
    `;
    const [userResult] = await db.promise().query(getUserIDSQL, [username]);

    if (userResult.length > 0) {
      const userID = userResult[0].User_ID;

      // Update teacher table with the User_ID
      const updateTeacherSQL = `
        UPDATE teacher 
        SET User_ID = ? 
        WHERE Teacher_ID = ?
      `;
      await db.promise().query(updateTeacherSQL, [userID, teacherID]);

      // Respond with success
      res
        .status(201)
        .send({ message: "Teacher added successfully", teacherID });
    } else {
      res.status(500).send({
        message: "User ID not found after inserting into user_credentials",
      });
    }
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
    const financeData = result.map((row) => ({
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
  WHERE ExpenseDate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
  GROUP BY ExpenseCategory;

  `;

  connection.query(expenseSummaryQuery, (err, result) => {
    if (err) {
      console.error("Error fetching expense summary:", err);
      return res.status(500).json({ error: "Error fetching expense summary" });
    }

    // console.log("Raw Query Result:", result); // Log raw data from the database

    const summary = result.map((row) => ({
      name: row.ExpenseCategory,
      value: parseFloat(row.totalAmount),
    }));

    // console.log("Formatted Summary:", summary); // Log formatted data sent to the client

    res.json(summary);
  });
});
////////////////////////////////Communication Center//////////////

// Announcement creation API
app.post("/api/announcements", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and get user data
    const decoded = jwt.verify(token, SECRET_KEY);
    const { userId } = decoded; // Get user ID from the token

    const { Title, Content, Target_Audience, Target_ID, Expiry_Date } =
      req.body;

    // SQL query to insert the announcement into the database
    const sql = `
      INSERT INTO Announcements (Title, Content, Target_Audience, Target_ID, Created_By, Created_At, Expiry_Date)
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;
    connection.query(
      sql,
      [Title, Content, Target_Audience, Target_ID, userId, Expiry_Date],
      (err, results) => {
        if (err) {
          console.error("Error inserting announcement:", err);
          return res
            .status(500)
            .json({ message: "Failed to create announcement" });
        }

        res.status(200).json({ message: "Announcement created successfully" });
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// announcement fetching
// Assuming you're using Express
app.get("/api/announcements", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM announcements ORDER BY Expiry_date DESC"; // Adjust according to your DB structure

  connection.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    res.status(200).json(results);
  });
});

///////////////////////////////// Event creation
app.post("/api/events", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token and get user data
    const decoded = jwt.verify(token, SECRET_KEY);
    const { userId } = decoded; // Get user ID from the token

    const { Title, Description, Event_Date } = req.body;

    // SQL query to insert the event into the database
    const sql = `
      INSERT INTO Events (Title, Description, Event_Date, Created_By, Created_At)
      VALUES (?, ?, ?, ?, NOW())
    `;
    connection.query(
      sql,
      [Title, Description, Event_Date, userId],
      (err, results) => {
        if (err) {
          console.error("Error inserting event:", err);
          return res.status(500).json({ message: "Failed to create event" });
        }

        res.status(200).json({ message: "Event created successfully" });
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Fetch events
app.get("/api/events", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const sql = `
      SELECT Event_id, Title, Description, Event_Date
      FROM Events
      
    `;

    connection.query(sql, [decoded.userId, decoded.userId], (err, results) => {
      if (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json({ message: "Failed to fetch events" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// FORUMS///////////////////////////////
// Get Forums
app.post("/api/forums", authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId; // Access the userId from the decoded token

  const sql = `
    INSERT INTO Forums (Name, Description, Created_By, Created_At)
    VALUES (?, ?, ?, NOW())
  `;

  connection.query(sql, [name, description, userId], (err, results) => {
    if (err) {
      console.error("Error creating forum:", err);
      return res.status(500).json({ message: "Failed to create forum" });
    }

    res.status(200).json({ message: "Forum created successfully" });
  });
});

// Fetch all forums
app.get("/api/forums", authenticateToken, (req, res) => {
  // The SQL query to fetch all forums ordered by creation date
  const sql = "SELECT * FROM forums ORDER BY Created_At DESC";

  connection.query(sql, (err, results) => {
    if (err) {
      // Handle database query error
      console.error("Error fetching forums:", err);

      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    // Log the results to verify data is returned

    // Return the fetched forums as a JSON response
    res.status(200).json(results);
  });
});

// Get Threads in a Forum
app.get("/api/forums/:forumId/threads", authenticateToken, (req, res) => {
  const { forumId } = req.params;

  const sql =
    "SELECT * FROM Threads WHERE Forum_ID = ? ORDER BY Created_At DESC";

  connection.query(sql, [forumId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch threads", error: err.message });
    }
    console.log("Forum ID:", forumId);
    console.log("Query results:", results);

    res.status(200).json(results);
  });
});

// Create Thread
app.post("/api/forums/:forumId/threads", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Decode JWT to get user ID
    const userId = decoded.userId; // Extract user ID from token

    const { forumId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    // SQL query to insert a new thread
    const sql = `
      INSERT INTO Threads (Forum_ID, Title, Content, Created_By, Created_At)
      VALUES (?, ?, ?, ?, NOW())
    `;

    connection.query(sql, [forumId, title, content, userId], (err, result) => {
      if (err) {
        console.error("Error creating thread:", err);
        return res.status(500).json({ message: "Failed to create thread" });
      }

      res.status(201).json({
        message: "Thread created successfully",
        threadId: result.insertId,
        forumId,
        title,
        content,
        createdBy: userId,
        createdAt: new Date().toISOString(),
      });
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Get Comments in a Thread
app.get("/api/threads/:threadId/comments", authenticateToken, (req, res) => {
  const { threadId } = req.params;

  const sql =
    "SELECT * FROM Comments WHERE Thread_ID = ? ORDER BY Created_At DESC";

  connection.query(sql, [threadId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch comments", error: err.message });
    }
    console.log(results);
    res.status(200).json(results);
  });
});

// Add Comment to a Thread
app.post("/api/threads/:threadId/comments", authenticateToken, (req, res) => {
  const { threadId } = req.params; // Extract thread ID from URL parameters
  const { content } = req.body; // Extract the comment content from request body

  // Extract user ID from JWT (from the authenticateToken middleware)
  const userId = req.user.userId; // The 'userId' field should be from the decoded JWT payload

  if (!content) {
    return res
      .status(400)
      .json({ message: "Content is required for the comment." });
  }

  // SQL query to insert a new comment
  const sql = `
    INSERT INTO Comments (Thread_ID, Content, Created_By, Created_At)
    VALUES (?, ?, ?, NOW())
  `;

  connection.query(sql, [threadId, content, userId], (err, result) => {
    if (err) {
      console.error("Error adding comment:", err);
      return res.status(500).json({ message: "Failed to add comment" });
    }

    res.status(201).json({
      message: "Comment added successfully",
      commentId: result.insertId,
      threadId,
      content,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    });
  });
});

// Update Thread/Forum (optional)
app.patch("/api/threads/:threadId", authenticateToken, (req, res) => {
  const { threadId } = req.params;
  const { title, content } = req.body;

  const sql = "UPDATE Threads SET Title = ?, Content = ? WHERE Thread_ID = ?";

  connection.query(sql, [title, content, threadId], (err, results) => {
    if (err) {
      console.error("Error updating thread:", err);
      return res.status(500).json({ message: "Failed to update thread" });
    }

    res.status(200).json({ message: "Thread updated successfully" });
  });
});
//////////////////////////////////Exams table/////////////////////////
app.get("/api/exam-results", (req, res) => {
  const sql = `
    SELECT 
      e.Exam_ID AS ResultID,
      CONCAT(s.First_Name, ' ', s.Second_Name) AS StudentName,
      sc.School_Name AS School,
      s.Year_Level AS Grade,
      e.Exam_Type AS ExamType,
      e.Score,
      e.Total_Marks AS TotalMarks
    FROM 
      exams e
    JOIN 
      student_record s ON e.Student_ID = s.Student_ID
    JOIN 
      school sc ON e.School_ID = sc.School_ID;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching exam results:", err);
      return res.status(500).json({ error: "Failed to fetch exam results" });
    }
    res.json(results);
  });
});
////////////////////////////RESOURCE SHARING //////////////////////////////////////////////////////////

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const isImage = file.mimetype.startsWith("image/");
      cb(null, isImage ? "./uploads/thumbnails" : "./uploads/media");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "video/x-matroska", // Added video/x-matroska for .mkv
      "audio/mpeg",
      "audio/mp3",
      "audio/x-m4a",
      "application/pdf",
    ];
    console.log("MIME Type:", file.mimetype);
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.error("Rejected File Type:", file.mimetype);
      cb(new Error("Invalid file type!"), false);
    }
  },
  limits: { fileSize: 500 * 1024 * 1024 }, // 10 MB limit
});

// Get the current directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post(
  "/api/upload-resource",
  authenticateToken,
  upload.fields([
    { name: "media", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      title,
      description,
      category,
      gradeLevel,
      subject,
      resourceType,
      additionalText,
    } = req.body;
    const { media, thumbnail } = req.files;
    const userId = req.user.userId; // Extract user ID from JWT

    if (
      !title ||
      !description ||
      !category ||
      !gradeLevel ||
      !subject ||
      !resourceType ||
      !media
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Prepare file data
    const mediaPath = media ? media[0].path : null;
    const thumbnailPath = thumbnail ? thumbnail[0].path : null;

    const sql = `
    INSERT INTO resources (Title, Description, Category, Grade_Level, Subject, Resource_Type, file_Path, thumbnail_Path, Additional_Text, uploaded_By, uploaded_At)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

    connection.query(
      sql,
      [
        title,
        description,
        category,
        gradeLevel,
        subject,
        resourceType,
        mediaPath,
        thumbnailPath,
        additionalText || "",
        userId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error uploading media:", err);
          return res.status(500).json({ message: "Failed to upload media" });
        }

        res.status(201).json({
          message: "Media uploaded successfully!",
          mediaId: result.insertId,
          title,
          description,
          category,
          gradeLevel,
          subject,
          resourceType,
          mediaPath,
          thumbnailPath,
          additionalText,
        });
      }
    );
  }
);

app.get("/api/resources/:gradeLevel", authenticateToken, (req, res) => {
  const { gradeLevel } = req.params;

  const sql = `SELECT * FROM resources WHERE grade_level = ?`;

  connection.query(sql, [gradeLevel], (err, results) => {
    if (err) {
      console.error("Error fetching resources:", err);
      return res.status(500).json({ message: "Failed to fetch resources" });
    }

    res.status(200).json(results);
  });
});

// PROFILE VIEW ////////////////////////////////////////////////////////////
app.get("/api/profile", authenticateToken, (req, res) => {
  const userId = req.user?.userId; // Use 'userId' from decoded JWT (not 'User_ID')

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID missing" });
  }

  const sql = `
    SELECT 
  CONCAT(a.First_Name, ' ', a.Second_Name) AS Name,
  u.Username AS Username,
  u.Email AS Email,
  a.Role AS Role,
  p.picture_path AS ProfilePicture
FROM 
  admin a
JOIN 
  user_credentials u ON a.User_ID = u.User_ID
LEFT JOIN 
  user_profile_pictures p ON a.User_ID = p.User_ID
WHERE 
  a.User_ID = ?;

  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).json({ error: "Failed to fetch profile details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(results[0]); // Return the first result since User_ID is unique
  });
});

// ProfilePicture////////////////////////////////////////////////////////
const profilePicUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/profile_pictures"); // Directory to store profile pictures
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type! Only JPEG, PNG, and JPG are allowed."),
        false
      );
    }
  },
});

// Profile update API
// Profile update API with deletion of previous profile picture

// Profile update API with deletion of previous profile picture
app.put(
  "/api/update-profile",
  profilePicUpload.single("profilePicture"),
  (req, res) => {
    // Extract token from headers and decode it
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, "your-secret-key"); // Replace with your JWT secret key
      const userId = decoded.userId;

      // Extract form data
      const { name, email } = req.body;

      // Validate input
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // Split the name into first and last names
      const [firstName, ...rest] = name.split(" ");
      const secondName = rest.join(" ");

      // SQL queries
      const updateAdminQuery = `
      UPDATE admin 
      SET First_Name = ?, Second_Name = ? 
      WHERE User_ID = ?
    `;
      const updateUserQuery = `
      UPDATE user_credentials
      SET Email = ?
      WHERE User_ID = ?
    `;
      const getPreviousPictureQuery = `
      SELECT picture_path FROM user_profile_pictures 
      WHERE user_id = ?
    `;
      const updatePictureQuery = `
      UPDATE user_profile_pictures 
      SET picture_path = ? 
      WHERE user_id = ?
    `;
      const insertPictureQuery = `
      INSERT INTO user_profile_pictures (user_id, picture_path) 
      VALUES (?, ?)
    `;

      const picturePath = req.file
        ? `/uploads/profile_pictures/${req.file.filename}`
        : null;

      // Perform updates
      db.query(updateAdminQuery, [firstName, secondName, userId], (err) => {
        if (err) {
          console.error("Error updating admin details:", err);
          return res
            .status(500)
            .json({ error: "Failed to update admin details" });
        }

        db.query(updateUserQuery, [email, userId], (err) => {
          if (err) {
            console.error("Error updating user email:", err);
            return res
              .status(500)
              .json({ error: "Failed to update user email" });
          }

          if (picturePath) {
            // Check for existing profile picture
            db.query(getPreviousPictureQuery, [userId], (err, results) => {
              if (err) {
                console.error("Error fetching previous profile picture:", err);
                return res
                  .status(500)
                  .json({ error: "Failed to fetch previous profile picture" });
              }

              const previousPicturePath =
                results.length > 0 ? results[0].picture_path : null;

              // Delete previous picture file if it exists
              if (previousPicturePath) {
                const absolutePath = `./uploads${previousPicturePath}`;
                fs.unlink(absolutePath, (unlinkErr) => {
                  if (unlinkErr && unlinkErr.code !== "ENOENT") {
                    console.error(
                      "Error deleting previous profile picture:",
                      unlinkErr
                    );
                    // Continue updating even if the file deletion fails
                  }
                });
              }

              // Update or insert new profile picture
              if (results.length > 0) {
                db.query(updatePictureQuery, [picturePath, userId], (err) => {
                  if (err) {
                    console.error("Error updating profile picture:", err);
                    return res
                      .status(500)
                      .json({ error: "Failed to update profile picture" });
                  }

                  res.json({ message: "Profile updated successfully" });
                });
              } else {
                db.query(insertPictureQuery, [userId, picturePath], (err) => {
                  if (err) {
                    console.error("Error inserting profile picture:", err);
                    return res
                      .status(500)
                      .json({ error: "Failed to insert profile picture" });
                  }

                  res.json({ message: "Profile updated successfully" });
                });
              }
            });
          } else {
            res.json({ message: "Profile updated successfully" });
          }
        });
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      res
        .status(500)
        .json({ error: "Server error occurred during profile update" });
    }
  }
);

// Admin creation/////////////////////////////////

app.post("/api/admins", (req, res) => {
  const { First_Name, Second_Name, Email, Role } = req.body;

  // Input validation
  if (!First_Name || !Second_Name || !Email || !Role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email already exists
  const checkEmailSQL = "SELECT * FROM user_credentials WHERE Email = ?";
  db.query(checkEmailSQL, [Email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Generate default username and password
    const username = `${First_Name.toLowerCase()}.${Second_Name.toLowerCase()}`;
    const defaultPassword = "password123";

    // Hash the password
    bcrypt.hash(defaultPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error creating credentials." });
      }

      // Insert into user_credentials table
      const insertCredentialsSQL = `
        INSERT INTO user_credentials (Username, Password_Hash, Role, Email)
        VALUES (?, ?, ?, ?)
      `;
      const credentialsValues = [
        username,
        hashedPassword,
        Role.toLowerCase(),
        Email,
      ];
      db.query(
        insertCredentialsSQL,
        credentialsValues,
        (err, credentialsResult) => {
          if (err) {
            console.error("Error inserting credentials:", err);
            return res
              .status(500)
              .json({ message: "Error adding user credentials." });
          }

          // Get the inserted User_ID
          const userID = credentialsResult.insertId;

          // Insert admin data into the admin table
          const insertAdminSQL = `
          INSERT INTO admin (User_ID, First_Name, Second_Name, Role, Created_At)
          VALUES (?, ?, ?, ?, NOW())
        `;
          const adminValues = [userID, First_Name, Second_Name, Role];
          db.query(insertAdminSQL, adminValues, (err, adminResult) => {
            if (err) {
              console.error("Error inserting admin:", err);
              return res.status(500).json({ message: "Error adding admin." });
            }

            // Respond with success
            res.status(201).json({
              message: "Admin added successfully",
              adminID: adminResult.insertId,
              username,
              defaultPassword,
            });
          });
        }
      );
    });
  });
});

// SCHOOL CREATION////////////////////////////////////////////////////////////////////
app.post("/api/schools", (req, res) => {
  const {
    School_Name,
    Location,
    Address,
    Contact_Number,
    Email,
    Principal_Name,
  } = req.body;

  // Validation
  if (
    !School_Name ||
    !Location ||
    !Address ||
    !Contact_Number ||
    !Email ||
    !Principal_Name
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // SQL query to insert school data
  const sql = `
    INSERT INTO school (
      School_Name, Location, Address, Contact_Number, Email, Principal_Name
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    School_Name,
    Location,
    Address,
    Contact_Number,
    Email,
    Principal_Name,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating school:", err);
      return res.status(500).json({
        message: "An error occurred while creating the school.",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "School created successfully!",
      School_ID: result.insertId,
    });
  });
});

// Not Teaching Staff/////////////////////////////////////////////
app.post("/api/non-teaching-staff", (req, res) => {
  const {
    First_Name,
    Last_Name,
    Position,
    Contact_Info,
    Department,
    School_Name,
  } = req.body;

  // Input validation
  if (
    !First_Name ||
    !Last_Name ||
    !Position ||
    !Contact_Info ||
    !Department ||
    !School_Name
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Generate the email from First_Name and Last_Name
  const email = `${First_Name.toLowerCase()}.${Last_Name.toLowerCase()}@mail.com`;

  // Check if email already exists in user_credentials table
  const checkEmailSQL = "SELECT * FROM user_credentials WHERE Email = ?";
  db.query(checkEmailSQL, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Generate default username for non-teaching staff
    const username = `${First_Name.toLowerCase()}.${Last_Name.toLowerCase()}`;

    // Generate default password for the non-teaching staff
    const defaultPassword = "password123";

    // Hash the password
    bcrypt.hash(defaultPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error creating credentials." });
      }

      // Insert into user_credentials table
      const insertCredentialsSQL = `
        INSERT INTO user_credentials (Username, Password_Hash, Role, Email)
        VALUES (?, ?, ?, ?)
      `;
      const credentialsValues = [
        username,
        hashedPassword,
        "Non-Teaching",
        email,
      ];
      db.query(
        insertCredentialsSQL,
        credentialsValues,
        (err, credentialsResult) => {
          if (err) {
            console.error("Error inserting credentials:", err);
            return res
              .status(500)
              .json({ message: "Error adding user credentials." });
          }

          // Find the School_ID based on the selected school name
          const selectSchoolSQL =
            "SELECT School_ID FROM school WHERE School_Name = ?";
          db.query(selectSchoolSQL, [School_Name], (err, schoolResults) => {
            if (err) {
              console.error("Error fetching school:", err);
              return res
                .status(500)
                .json({ message: "Error fetching school." });
            }

            if (schoolResults.length === 0) {
              return res.status(400).json({ message: "School not found." });
            }

            const schoolID = schoolResults[0].School_ID;

            // Insert non-teaching staff data into the non_teaching_staff table without User_ID
            const insertNonTeachingStaffSQL = `
            INSERT INTO non_teaching_staff (First_Name, Last_Name, Position, Contact_Info, Department, School_ID, Created_At)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
          `;
            const nonTeachingStaffValues = [
              First_Name,
              Last_Name,
              Position,
              Contact_Info,
              Department,
              schoolID,
            ];
            db.query(
              insertNonTeachingStaffSQL,
              nonTeachingStaffValues,
              (err, result) => {
                if (err) {
                  console.error("Error inserting non-teaching staff:", err);
                  return res
                    .status(500)
                    .json({ message: "Error adding non-teaching staff." });
                }

                // Respond with success
                res.status(201).json({
                  message: "Non-Teaching Staff added successfully",
                  nonTeachingStaffID: result.insertId,
                  username,
                  defaultPassword,
                  email, // Include the generated email in the response
                });
              }
            );
          });
        }
      );
    });
  });
});

// Usercards daynamics////////////////////
app.get("/api/student-count", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM student_record", (err, results) => {
    if (err) {
      console.error("Error fetching student count:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json(results[0].total);
  });
});

// Route to get total teacher count (from 'teacher' table)
app.get("/api/teacher-count", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM teacher", (err, results) => {
    if (err) {
      console.error("Error fetching teacher count:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json(results[0].total);
  });
});

// Route to get total parent count (from 'application' table where status is 'accepted')
app.get("/api/parent-count", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM application WHERE status = 'accepted'",
    (err, results) => {
      if (err) {
        console.error("Error fetching parent count:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.json(results[0].total);
    }
  );
});

// Route to get total staff count (from 'non_teaching_staff' table)
app.get("/api/staff-count", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM non_teaching_staff",
    (err, results) => {
      if (err) {
        console.error("Error fetching staff count:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.json(results[0].total);
    }
  );
});

// Chartcount//////////////////////////////////
app.get("/api/student-gender-count", (req, res) => {
  const sql = `
    SELECT gender, COUNT(*) as count
    FROM application
    WHERE status = 'accepted' AND (Gender = 'Male' OR Gender = 'Female')
    GROUP BY Gender
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching student gender count:", err);
      return res.status(500).json({ message: "Database error." });
    }

    // Format results to match the frontend structure
    const genderData = results.reduce(
      (acc, row) => {
        if (row.gender === "Male") {
          acc.boys = row.count;
        } else if (row.gender === "Female") {
          acc.girls = row.count;
        }
        return acc;
      },
      { boys: 0, girls: 0 }
    );

    res.json(genderData);
  });
});
// PopulaionChart//////////////////////////////////////////

// Admins Count Route
app.get("/api/admin-count", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM admin", (err, results) => {
    if (err) {
      console.error("Error fetching admin count:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ count: results[0].total });
  });
});

// Students Count Route
app.get("/api/student-counter", (req, res) => {
  db.query(
    'SELECT COUNT(*) AS total FROM student_record WHERE Status = "Active"',
    (err, results) => {
      if (err) {
        console.error("Error fetching student count:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.json({ count: results[0].total });
    }
  );
});

// Teachers Count Route
app.get("/api/teacher-counter", (req, res) => {
  db.query(
    'SELECT COUNT(*) AS total FROM teacher WHERE Status = "Active"',
    (err, results) => {
      if (err) {
        console.error("Error fetching teacher count:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.json({ count: results[0].total });
    }
  );
});

// Non-Teaching Staff Count Route
app.get("/api/non-teaching-staff-count", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM non_teaching_staff",
    (err, results) => {
      if (err) {
        console.error("Error fetching non-teaching staff count:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.json({ count: results[0].total });
    }
  );
});

// STUDENT DISTRIBUTION////////////////////////////
// Gender Distribution Data Route
app.get("/api/gender-distribution", (req, res) => {
  const query = `
    SELECT 
      s.School_Name AS school_name,  -- Replace 'School_Name' with the actual column name for the school's name
      COUNT(CASE WHEN sr.gender = 'Male' THEN 1 END) AS boys,
      COUNT(CASE WHEN sr.gender = 'Female' THEN 1 END) AS girls
    FROM 
      school s
    LEFT JOIN 
      student_record sr
    ON 
      s.School_ID = sr.School_ID
    GROUP BY 
      s.School_Name  -- Match the corrected column name here as well
    ORDER BY 
      s.School_Name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching gender distribution data:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json(results);
  });
});

// WelcomeComponent/////////////////////////////////////////////
const JWT_SECRET = "your-secret-key"; // Hardcoded secret key

app.get("/api/welcome", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Decode JWT to get role and userId
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET); // Use the hardcoded JWT secret
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  const { role, userId } = decoded;

  if (!role || !userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing role or userId in token" });
  }

  // Now, fetch name based on the role
  let sql = "";
  if (role === "teacher") {
    sql = `
      SELECT CONCAT(t.First_Name, ' ', t.Last_Name) AS Name, 'Teacher' AS Role
      FROM teacher t WHERE t.User_ID = ?;
    `;
  } else if (role.toLowerCase() === "student") {
    sql = `
      SELECT CONCAT(s.First_Name, ' ', s.Second_Name) AS Name, 'Student' AS Role
      FROM student_record s WHERE s.User_ID = ?;
    `;
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  // Fetch name based on role
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching profile data:", err);
      return res.status(500).json({ error: "Failed to fetch profile details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(results[0]); // Return the profile with role and name
  });
});

// Teacher profile

const profilePicUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/profile_pictures"); // Directory for profile pictures
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type! Only JPEG, PNG, and JPG are allowed."),
        false
      );
    }
  },
});

// ✅ **1. Get Teacher Profile**
app.get("/api/get-teacher-profile", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;

    const profileQuery = `
      SELECT t.First_Name, t.Last_Name, u.Email, p.picture_path 
      FROM teacher t
      JOIN user_credentials u ON t.User_ID = u.User_ID
      LEFT JOIN user_profile_pictures p ON t.User_ID = p.user_id
      WHERE t.User_ID = ?;
    `;

    db.query(profileQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching teacher profile:", err);
        return res.status(500).json({ error: "Failed to fetch profile" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const profile = results[0];
      res.json({
        firstName: profile.First_Name,
        secondName: profile.Last_Name,
        email: profile.Email,
        picturePath: profile.picture_path || null,
      });
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
});

// ✅ **2. Update Teacher Profile with Picture Upload**
app.get("/api/teacher-profile", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const sql = `
      SELECT 
        t.First_Name, 
        t.Last_Name, 
        u.Email, 
        p.picture_path 
      FROM teacher t
      JOIN user_credentials u ON t.User_ID = u.User_ID
      LEFT JOIN user_profile_pictures p ON t.User_ID = p.user_id
      WHERE t.User_ID = ?;
    `;

    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching teacher profile:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch profile details" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Teacher profile not found" });
      }

      const profile = results[0];
      res.json({
        name: `${profile.First_Name} ${profile.Last_Name}`,
        email: profile.Email,
        profilePicture: profile.picture_path
          ? `http://localhost:3000${profile.picture_path}`
          : null, // Full path for frontend display
      });
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
});

// ✅ **3. Delete Profile Picture**
app.delete("/api/delete-profile-picture", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;

    const getPictureQuery =
      "SELECT picture_path FROM user_profile_pictures WHERE user_id = ?;";
    const deletePictureQuery =
      "DELETE FROM user_profile_pictures WHERE user_id = ?;";

    db.query(getPictureQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching profile picture:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch profile picture" });
      }
      if (results.length === 0 || !results[0].picture_path) {
        return res.status(400).json({ error: "No profile picture found" });
      }

      const filePath = path.join("uploads", results[0].picture_path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      db.query(deletePictureQuery, [userId], (err) => {
        if (err) {
          console.error("Error deleting profile picture from DB:", err);
          return res
            .status(500)
            .json({ error: "Failed to delete profile picture" });
        }
        res.json({ message: "Profile picture deleted successfully" });
      });
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
});

app.put(
  "/api/update-teacher-profile",
  authenticateToken,
  profilePicUploader.single("profilePicture"),
  (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const { userId } = decoded;
      const { firstName, lastName, email } = req.body;
      let picturePath = null;

      if (req.file) {
        picturePath = `/uploads/profile_pictures/${req.file.filename}`; // Relative path for frontend
      }

      // Start transaction
      db.beginTransaction((err) => {
        if (err) {
          console.error("Transaction error:", err);
          return res.status(500).json({ error: "Failed to update profile" });
        }

        // ✅ **Step 1: Update teacher details**
        const updateTeacherQuery = `
        UPDATE teacher 
        SET First_Name = ?, Last_Name = ? 
        WHERE User_ID = ?;
      `;
        db.query(
          updateTeacherQuery,
          [firstName, lastName, userId],
          (err, result) => {
            if (err) {
              console.error("Error updating teacher profile:", err);
              return db.rollback(() =>
                res.status(500).json({ error: "Failed to update profile" })
              );
            }

            // ✅ **Step 2: Update email in user_credentials**
            const updateEmailQuery = `UPDATE user_credentials SET Email = ? WHERE User_ID = ?;`;
            db.query(updateEmailQuery, [email, userId], (err, result) => {
              if (err) {
                console.error("Error updating email:", err);
                return db.rollback(() =>
                  res.status(500).json({ error: "Failed to update email" })
                );
              }

              // ✅ **Step 3: Update or Insert Profile Picture**
              if (picturePath) {
                const checkPictureQuery = `SELECT * FROM user_profile_pictures WHERE user_id = ?;`;
                db.query(checkPictureQuery, [userId], (err, results) => {
                  if (err) {
                    console.error("Error checking profile picture:", err);
                    return db.rollback(() =>
                      res
                        .status(500)
                        .json({ error: "Failed to update profile picture" })
                    );
                  }

                  let updatePictureQuery;
                  let params;
                  if (results.length > 0) {
                    // ✅ **Update existing profile picture path**
                    updatePictureQuery = `UPDATE user_profile_pictures SET picture_path = ? WHERE user_id = ?;`;
                    params = [picturePath, userId];
                  } else {
                    // ✅ **Insert new profile picture path**
                    updatePictureQuery = `INSERT INTO user_profile_pictures (user_id, picture_path) VALUES (?, ?);`;
                    params = [userId, picturePath];
                  }

                  db.query(updatePictureQuery, params, (err, result) => {
                    if (err) {
                      console.error("Error updating profile picture:", err);
                      return db.rollback(() =>
                        res
                          .status(500)
                          .json({ error: "Failed to update profile picture" })
                      );
                    }

                    db.commit((err) => {
                      if (err) {
                        console.error("Transaction commit error:", err);
                        return db.rollback(() =>
                          res
                            .status(500)
                            .json({ error: "Failed to update profile" })
                        );
                      }

                      res.json({
                        message: "Profile updated successfully",
                        picturePath, // Send updated picture path
                      });
                    });
                  });
                });
              } else {
                db.commit((err) => {
                  if (err) {
                    console.error("Transaction commit error:", err);
                    return db.rollback(() =>
                      res
                        .status(500)
                        .json({ error: "Failed to update profile" })
                    );
                  }

                  res.json({ message: "Profile updated successfully" });
                });
              }
            });
          }
        );
      });
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
);

// Teacher Password update////////////////////////

app.put("/api/update-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Decode user ID from the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { userId } = decoded; // Extract `userId` from decoded token

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch the user's current password hash from the database
    const [user] = await db
      .promise()
      .query("SELECT Password_Hash FROM user_credentials WHERE User_ID = ?", [
        userId,
      ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedPasswordHash = user[0].Password_Hash;

    // Compare the entered current password with the stored hash
    const isMatch = await bcrypt.compare(currentPassword, storedPasswordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db
      .promise()
      .query(
        "UPDATE user_credentials SET Password_Hash = ? WHERE User_ID = ?",
        [hashedNewPassword, userId]
      );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// STUDENTS SETTINGS////////////////////////
// ✅ **1. Get Student Profile**
app.get("/api/get-student-profile", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;

    const profileQuery = `
      SELECT s.First_Name, s.Second_Name, u.Email, p.picture_path
      FROM student_record s
      JOIN user_credentials u ON s.User_ID = u.User_ID
      LEFT JOIN user_profile_pictures p ON s.User_ID = p.user_id
      WHERE s.User_ID = ?;
    `;

    db.query(profileQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching student profile:", err);
        return res.status(500).json({ error: "Failed to fetch profile" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const profile = results[0];
      res.json({
        firstName: profile.First_Name,
        lastName: profile.Second_Name,
        email: profile.Email,
        picturePath: profile.picture_path || null,
      });
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
});
// ✅ **2. Update Student Profile with Picture Upload**
app.get("/api/student-profile", authenticateToken, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const sql = `
      SELECT 
        s.First_Name, 
        s.Last_Name, 
        u.Email, 
        p.picture_path 
      FROM student s
      JOIN user_credentials u ON s.User_ID = u.User_ID
      LEFT JOIN user_profile_pictures p ON s.User_ID = p.user_id
      WHERE s.User_ID = ?;
    `;

    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching student profile:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch profile details" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Student profile not found" });
      }

      const profile = results[0];
      res.json({
        name: `${profile.First_Name} ${profile.Last_Name}`,
        email: profile.Email,
        profilePicture: profile.picture_path
          ? `http://localhost:3000${profile.picture_path}`
          : null, // Full path for frontend display
      });
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
});
// ✅ **3. Delete Profile Picture**
app.delete(
  "/api/delete-student-profile-picture",
  authenticateToken,
  (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const { userId } = decoded;

      const getPictureQuery =
        "SELECT picture_path FROM user_profile_pictures WHERE user_id = ?;";
      const deletePictureQuery =
        "DELETE FROM user_profile_pictures WHERE user_id = ?;";

      db.query(getPictureQuery, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching profile picture:", err);
          return res
            .status(500)
            .json({ error: "Failed to fetch profile picture" });
        }
        if (results.length === 0 || !results[0].picture_path) {
          return res.status(400).json({ error: "No profile picture found" });
        }

        const filePath = path.join("uploads", results[0].picture_path);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        db.query(deletePictureQuery, [userId], (err) => {
          if (err) {
            console.error("Error deleting profile picture from DB:", err);
            return res
              .status(500)
              .json({ error: "Failed to delete profile picture" });
          }
          res.json({ message: "Profile picture deleted successfully" });
        });
      });
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
);

// ✅** UPDATE STUDENT PROFILE**
app.put(
  "/api/update-student-profile",
  authenticateToken,
  profilePicUploader.single("profilePicture"),
  (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const { userId } = decoded;
      const { firstName, lastName, email } = req.body;
      let picturePath = null;

      if (req.file) {
        picturePath = `/uploads/profile_pictures/${req.file.filename}`; // Relative path for frontend
      }

      // Start transaction
      db.beginTransaction((err) => {
        if (err) {
          console.error("Transaction error:", err);
          return res.status(500).json({ error: "Failed to update profile" });
        }

        // ✅ **Step 1: Update student details**
        const updateStudentQuery = `
        UPDATE student_record 
        SET First_Name = ?, Second_Name = ? 
        WHERE User_ID = ?;
      `;
        db.query(
          updateStudentQuery,
          [firstName, lastName, userId],
          (err, result) => {
            if (err) {
              console.error("Error updating student profile:", err);
              return db.rollback(() =>
                res.status(500).json({ error: "Failed to update profile" })
              );
            }

            // ✅ **Step 2: Update email in user_credentials**
            const updateEmailQuery = `UPDATE user_credentials SET Email = ? WHERE User_ID = ?;`;
            db.query(updateEmailQuery, [email, userId], (err, result) => {
              if (err) {
                console.error("Error updating email:", err);
                return db.rollback(() =>
                  res.status(500).json({ error: "Failed to update email" })
                );
              }

              // ✅ **Step 3: Update or Insert Profile Picture**
              if (picturePath) {
                const checkPictureQuery = `SELECT * FROM user_profile_pictures WHERE user_id = ?;`;
                db.query(checkPictureQuery, [userId], (err, results) => {
                  if (err) {
                    console.error("Error checking profile picture:", err);
                    return db.rollback(() =>
                      res
                        .status(500)
                        .json({ error: "Failed to update profile picture" })
                    );
                  }

                  let updatePictureQuery;
                  let params;
                  if (results.length > 0) {
                    // ✅ **Update existing profile picture path**
                    updatePictureQuery = `UPDATE user_profile_pictures SET picture_path = ? WHERE user_id = ?;`;
                    params = [picturePath, userId];
                  } else {
                    // ✅ **Insert new profile picture path**
                    updatePictureQuery = `INSERT INTO user_profile_pictures (user_id, picture_path) VALUES (?, ?);`;
                    params = [userId, picturePath];
                  }

                  db.query(updatePictureQuery, params, (err, result) => {
                    if (err) {
                      console.error("Error updating profile picture:", err);
                      return db.rollback(() =>
                        res
                          .status(500)
                          .json({ error: "Failed to update profile picture" })
                      );
                    }

                    db.commit((err) => {
                      if (err) {
                        console.error("Transaction commit error:", err);
                        return db.rollback(() =>
                          res
                            .status(500)
                            .json({ error: "Failed to update profile" })
                        );
                      }

                      res.json({
                        message: "Profile updated successfully",
                        picturePath, // Send updated picture path
                      });
                    });
                  });
                });
              } else {
                db.commit((err) => {
                  if (err) {
                    console.error("Transaction commit error:", err);
                    return db.rollback(() =>
                      res
                        .status(500)
                        .json({ error: "Failed to update profile" })
                    );
                  }

                  res.json({ message: "Profile updated successfully" });
                });
              }
            });
          }
        );
      });
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  }
);

// Resource Center///////////////////////////////
app.get("/api/resources", async (req, res) => {
  try {
    const { category, grade_level, subject, resource_type } = req.query;

    let query =
      "SELECT id, title, description, resource_type, file_path FROM resources WHERE 1";
    let params = [];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }
    if (grade_level) {
      query += " AND grade_level = ?";
      params.push(grade_level);
    }
    if (subject) {
      query += " AND subject = ?";
      params.push(subject);
    }
    if (resource_type) {
      query += " AND resource_type = ?";
      params.push(resource_type);
    }

    // Use query() instead of execute()
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to fetch resources" });
      }

      console.log("Database Result:", result); // Output the entire result
      res.json(result); // Send the result as JSON
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// STUDENT FEES
app.post("/api/pay", authenticateToken, (req, res) => {
  const { FeeType, AmountPaid, PaymentMethod } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User ID missing in token",
    });
  }

  if (!FeeType || !AmountPaid || AmountPaid <= 0 || !PaymentMethod) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment details" });
  }

  // Step 1: Get StudentID, SchoolID, and Student Name
  const studentQuery = `
    SELECT Student_ID, School_ID, First_Name, Second_Name 
    FROM student_record 
    WHERE User_ID = ?
  `;
  
  db.query(studentQuery, [userId], (err, studentResult) => {
    if (err) {
      console.error("Database Error (Fetching StudentID and SchoolID):", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (studentResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student record not found" });
    }

    const studentId = studentResult[0].Student_ID;
    const schoolId = studentResult[0].School_ID;
    const firstName = studentResult[0].First_Name || "";
    const secondName = studentResult[0].Second_Name || "";

    // Generate student initials
    const studentInitials =
      (firstName[0] ? firstName[0].toUpperCase() : "") +
      (secondName[0] ? secondName[0].toUpperCase() : "");

    if (!studentInitials) {
      return res.status(400).json({
        success: false,
        message: "Student initials could not be generated",
      });
    }

    // Step 2: Get School Name
    const schoolQuery = "SELECT School_Name FROM school WHERE School_ID = ?";
    db.query(schoolQuery, [schoolId], (err, schoolResult) => {
      if (err) {
        console.error("Database Error (Fetching School Name):", err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      if (schoolResult.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "School record not found" });
      }

      const schoolName = schoolResult[0].School_Name;
      const schoolInitials = schoolName
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");

      // Generate receipt number: School Initials + Student Initials + HHMMSS
      const receiptNumber = `${schoolInitials}${studentInitials}${new Date()
        .toLocaleTimeString()
        .replace(/:/g, "")}`;

      // Generate a unique reference number
      const referenceNumber = `REF${new Date().getTime()}`;

      // Step 3: Fetch current fee details
      const fetchQuery = `
        SELECT AmountDue, COALESCE(AmountPaid, 0) AS AmountPaid 
        FROM fees WHERE StudentID = ? 
      `;

      db.query(fetchQuery, [studentId], (err, results) => {
        if (err) {
          console.error("Database Error (Fetching Fees):", err);
          return res
            .status(500)
            .json({ success: false, message: "Server error" });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Fee record not found" });
        }

        const { AmountDue, AmountPaid: CurrentPaid } = results[0];
        const NewAmountPaid = parseFloat(CurrentPaid) + parseFloat(AmountPaid);
        const Balance = parseFloat(AmountDue) - NewAmountPaid;
        let PaymentStatus = Balance <= 0 ? "Paid" : "Partially Paid";

        // Step 4: Insert receipt record with new fields
        const insertReceiptQuery = `
          INSERT INTO receipts 
          (receiptNumber, referenceNumber, Student_ID, School_ID, feeType, paymentMethod, amountPaid, remainingBalance, date)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        db.query(
          insertReceiptQuery,
          [
            receiptNumber,
            referenceNumber,
            studentId,
            schoolId,
            FeeType,
            PaymentMethod,
            AmountPaid,
            Balance,
          ],
          (err, insertResult) => {
            if (err) {
              console.error("Database Error (Inserting Receipt):", err);
              return res
                .status(500)
                .json({ success: false, message: "Receipt creation failed" });
            }

            // Step 5: Update fee record
            const updateQuery = `
              UPDATE fees 
              SET AmountPaid = ?, FeeType = ?, PaymentStatus = ?, PaymentMethod = ?, UpdatedAt = NOW() 
              WHERE StudentID = ?
            `;

            db.query(
              updateQuery,
              [NewAmountPaid, FeeType, PaymentStatus, PaymentMethod, studentId],
              (err, updateResult) => {
                if (err) {
                  console.error("Update Error:", err);
                  return res
                    .status(500)
                    .json({ success: false, message: "Payment update failed" });
                }

                res.json({
                  success: true,
                  message: "Payment updated successfully",
                  Balance,
                  PaymentStatus,
                  ReceiptNumber: receiptNumber,
                  ReferenceNumber: referenceNumber,
                  AmountPaid,
                  FeeType,
                  PaymentMethod,
                  DatePaid: new Date().toISOString(),
                });
              }
            );
          }
        );
      });
    });
  });
});


// SEARCH FEES
app.get("/api/feessearch", authenticateToken, (req, res) => {
  const userId = req.user?.userId;

  // Get StudentID
  const studentQuery =
    "SELECT Student_ID FROM student_record WHERE User_ID = ?";
  db.query(studentQuery, [userId], (err, studentResult) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (studentResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student record not found" });
    }
    const studentId = studentResult[0].Student_ID;

    // Fetch fee details including last paid FeeType
    const fetchQuery = `
      SELECT 
        f.FeeType, 
        f.AmountDue - f.AmountPaid AS amount_remaining, 
        f.FeeType
      FROM fees f 
      WHERE f.Student_ID = ?
    `;

    db.query(fetchQuery, [studentId], (err, results) => {
      if (err) {
        console.error("Database Error (Fetching Fees):", err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      res.json({ success: true, fees: results });
    });
  });
});

// Fetch receipt data
app.get("/api/receipt", authenticateToken, (req, res) => {
  const userId = req.user?.userId;
  console.log("Authenticated userId:", userId);

  // Step 1: Fetch student ID, full name, and school ID
  const studentQuery = `
    SELECT Student_ID, School_ID, CONCAT(First_Name, ' ', Second_Name) AS studentName 
    FROM student_record 
    WHERE User_ID = ?
  `;

  db.query(studentQuery, [userId], (err, studentResult) => {
    if (err) {
      console.error("Error fetching student record:", err);
      return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }

    if (!studentResult || studentResult.length === 0) {
      console.log("No student found for userID:", userId);
      return res.status(404).json({ success: false, message: "Student record not found." });
    }

    const studentID = studentResult[0].Student_ID;
    const schoolID = studentResult[0].School_ID;
    const studentName = studentResult[0].studentName;
    console.log("Fetched studentID:", studentID, "School_ID:", schoolID, "Student Name:", studentName);

    // Step 2: Fetch school name using school ID
    const schoolQuery = `SELECT School_Name FROM school WHERE School_ID = ?`;

    db.query(schoolQuery, [schoolID], (err, schoolResult) => {
      if (err) {
        console.error("Error fetching school details:", err);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
      }

      if (!schoolResult || schoolResult.length === 0) {
        console.log("No school found for School_ID:", schoolID);
        return res.status(404).json({ success: false, message: "School record not found." });
      }

      const schoolName = schoolResult[0].School_Name;
      console.log("Fetched schoolName:", schoolName);

      // Step 3: Fetch all receipts for the student with fee details
      const receiptQuery = `
        SELECT 
          r.receiptNumber,
          r.referenceNumber,
          r.date,
          r.remainingBalance,
          f.FeeType AS feeType,
          f.PaymentMethod AS paymentMethod,
          r.AmountPaid AS amountPaid 
        FROM receipts r
        JOIN fees f ON r.Student_ID = f.StudentID
        WHERE r.Student_ID = ?
        ORDER BY r.date DESC
      `;

      db.query(receiptQuery, [studentID], (err, receiptResults) => {
        if (err) {
          console.error("Error fetching receipts:", err);
          return res.status(500).json({ success: false, message: "Server error. Please try again later." });
        }

        if (!receiptResults || receiptResults.length === 0) {
          console.log("No receipts found for studentID:", studentID);
          return res.status(404).json({ success: false, message: "No receipts found for this student." });
        }

        return res.status(200).json({
          success: true,
          studentName: studentName,
          schoolName: schoolName,
          receipts: receiptResults, // Send an array of all receipts
        });
      });
    });
  });
});


// TIMETABLE
import moment from "moment"; // Ensure moment.js is installed

app.get("/api/teacher/upcoming-classes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId; // Extract User_ID from JWT
    console.log("Extracted userId from JWT:", userId);

    if (!userId) {
      console.error("User ID is undefined. Check JWT payload.");
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Step 1: Get teacher details (ID & Name)
    db.query(
      "SELECT Teacher_ID, CONCAT(First_Name, ' ', Last_Name) AS TeacherName FROM teacher WHERE User_ID = ?",
      [userId],
      (err, teacherResult) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (!teacherResult.length) {
          console.error("No teacher found for user ID:", userId);
          return res.status(404).json({ error: "Teacher not found" });
        }

        const teacherID = teacherResult[0].Teacher_ID;
        const teacherName = teacherResult[0].TeacherName;
        console.log("Extracted Teacher_ID:", teacherID);
        console.log("Extracted Teacher Name:", teacherName);

        // Step 2: Fetch timetable with weekdays
        db.query(
          `SELECT 
              subject, 
              grade_level, 
              weekday, 
              start_time, 
              end_time, 
              location 
           FROM timetable 
           WHERE Teacher_ID = ? 
           ORDER BY FIELD(weekday, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), start_time ASC`,
          [teacherID],
          (err, classResults) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ error: "Database error" });
            }

            console.log("Raw Upcoming Classes:", classResults);

            // Get the start of the **current** week dynamically
            const today = moment();
            const startOfWeek = today.clone().startOf("isoWeek"); // Always get Monday of the **current** week

            const weekdayMap = {
              Monday: startOfWeek.clone().add(0, "days"),
              Tuesday: startOfWeek.clone().add(1, "days"),
              Wednesday: startOfWeek.clone().add(2, "days"),
              Thursday: startOfWeek.clone().add(3, "days"),
              Friday: startOfWeek.clone().add(4, "days"),
              Saturday: startOfWeek.clone().add(5, "days"),
              Sunday: startOfWeek.clone().add(6, "days"),
            };

            // Formatting data for lesson-schedule-react
            const formattedClasses = classResults.map((classItem) => {
              // Assign the correct upcoming **week’s** date based on today's date
              let lessonDate = weekdayMap[classItem.weekday];

              // If the class was **in the past**, move it to the next week's occurrence
              if (lessonDate.isBefore(today, "day")) {
                lessonDate = lessonDate.add(7, "days"); // Move to next week's same weekday
              }

              return {
                lessonPair: {
                  start_time: classItem.start_time,
                  end_time: classItem.end_time,
                },
                lesson_date: Math.floor(lessonDate.toDate().getTime() / 1000), // Convert to Unix timestamp
                auditorium: { name: classItem.location },
                subject: { name: classItem.subject },
                trainingType: { name: classItem.grade_level }, // Use grade level instead of "Class"
                employee: { name: teacherName }, // Assign actual teacher name
              };
            });

            console.log("Formatted Upcoming Classes:", formattedClasses);
            res.json(formattedClasses);
          }
        );
      }
    );
  } catch (error) {
    console.error("Error fetching upcoming classes:", error);
    res.status(500).json({ error: "Failed to fetch upcoming classes" });
  }
});
//SUBJECTS
app.get("/api/subjects", (req, res) => {
  db.query("SELECT * FROM subjects", (error, results) => {
    if (error) {
      console.error("Error fetching subjects:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

//Assign subject
app.post("/api/admin/assign-subject", (req, res) => {
  const { teacher_id, subject, grade_level, weekday, start_time, end_time, location } = req.body;

  // Validate that all required fields are provided
  if (!teacher_id || !subject || !grade_level || !weekday || !start_time || !end_time || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert into the timetable table
  db.query(
    "INSERT INTO timetable (Teacher_ID, subject, grade_level, weekday, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [teacher_id, subject, grade_level, weekday, start_time, end_time, location],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Lesson assigned successfully" });
    }
  );
});





///////////////////Claa management
app.get("/api/teacher/subjects", authenticateToken, (req, res) => {
  const userId = req.user?.userId;

  db.query(
    `SELECT subject, grade_level, start_time, end_time 
     FROM timetable 
     WHERE Teacher_ID = (SELECT Teacher_ID FROM teacher WHERE User_ID = ?)`,
    [userId],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});


app.get("/api/teacher/students", authenticateToken, (req, res) => {
  const { subject } = req.query;
  const userId = req.user?.userId;

  const query = `
    SELECT sr.Student_ID, sr.First_Name, sr.Second_Name
    FROM student_record sr
    JOIN teacher te ON sr.School_ID = te.School_ID
    JOIN timetable t ON te.Teacher_ID = t.Teacher_ID
    WHERE t.subject = ? AND te.User_ID = ? AND sr.Year_Level = t.grade_level
  `;

  db.query(query, [subject, userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

 ////////Gradebook 
 // 📌 POST /grades → Add or Update Grades
 app.post("/grades", authenticateToken, (req, res) => {
  const { subject, term, year, grades } = req.body;
  const userId = req.user?.userId;

  console.log("🔹 Incoming request data:", req.body);
  console.log("🔹 Extracted userId from token:", userId);

  // 🔹 Step 1: Extract Subject Name (Remove Grade Level)
  const cleanSubject = subject.replace(/\(.*?\)/g, "").trim(); // Removes anything in parentheses
  console.log(`✅ Extracted clean subject name: ${cleanSubject}`);

  // 🔹 Step 2: Fetch `teacher_id` using `userId`
  db.query(
    "SELECT Teacher_ID FROM teacher WHERE User_ID = ?",
    [userId],
    (err, teacherResults) => {
      if (err) {
        console.error("❌ Error fetching teacher_id:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (teacherResults.length === 0) {
        console.warn("⚠️ No teacher found for userId:", userId);
        return res.status(404).json({ error: "Teacher not found" });
      }

      const teacher_id = teacherResults[0].Teacher_ID;
      console.log(`✅ Found teacher_id: ${teacher_id} for userId: ${userId}`);

      // 🔹 Step 3: Fetch `subject_id` using the extracted subject name
      db.query(
        "SELECT id FROM subjects WHERE name = ?",
        [cleanSubject],
        (err, subjectResults) => {
          if (err) {
            console.error("❌ Error fetching subject_id:", err.message);
            return res.status(500).json({ error: err.message });
          }

          if (subjectResults.length === 0) {
            console.warn("⚠️ Subject not found:", cleanSubject);
            return res.status(404).json({ error: "Subject not found" });
          }

          const subject_id = subjectResults[0].id;
          console.log(`✅ Found subject_id: ${subject_id} for subject: ${cleanSubject}`);

          // 🔹 Step 4: Insert or Update Grades
          const queries = grades.map(({ student_id, cat1, cat2, endterm_exam }) => {
            console.log(`📌 Processing student_id: ${student_id}, Subject: ${subject_id}`);

            return new Promise((resolve, reject) => {
              db.query(
                `SELECT id FROM grades WHERE student_id = ? AND subject_id = ? AND term = ? AND year = ?`,
                [student_id, subject_id, term, year],
                (checkErr, checkResults) => {
                  if (checkErr) {
                    console.error("❌ Error checking existing grade:", checkErr.message);
                    return reject(checkErr);
                  }

                  if (checkResults.length > 0) {
                    // 🔄 Update Existing Grade
                    console.log(`🔄 Updating existing grade for Student ${student_id}, Subject ${subject_id}`);
                    db.query(
                      `UPDATE grades 
                       SET cat1 = ?, cat2 = ?, endterm_exam = ?, updated_at = NOW()
                       WHERE student_id = ? AND subject_id = ? AND term = ? AND year = ?`,
                      [cat1, cat2, endterm_exam, student_id, subject_id, term, year],
                      (updateErr) => {
                        if (updateErr) {
                          console.error("❌ Error updating grade:", updateErr.message);
                          return reject(updateErr);
                        }
                        console.log(`✅ Grade updated for Student ${student_id}`);
                        resolve();
                      }
                    );
                  } else {
                    // ➕ Insert New Grade
                    console.log(`➕ Inserting new grade for Student ${student_id}, Subject ${subject_id}`);
                    db.query(
                      `INSERT INTO grades (Student_ID, subject_id, Teacher_ID, cat1, cat2, endterm_exam, term, year)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                      [student_id, subject_id, teacher_id, cat1, cat2, endterm_exam, term, year],
                      (insertErr) => {
                        if (insertErr) {
                          console.error("❌ Error inserting new grade:", insertErr.message);
                          return reject(insertErr);
                        }
                        console.log(`✅ Grade inserted for Student ${student_id}`);
                        resolve();
                      }
                    );
                  }
                }
              );
            });
          });

          // 🔹 Step 5: Wait for all queries to complete, then send response
          Promise.all(queries)
            .then(() => {
              console.log("✅ All grades updated successfully");
              res.json({ message: "Grades updated successfully" });
            })
            .catch((err) => {
              console.error("❌ Error updating grades:", err.message);
              res.status(500).json({ error: err.message });
            });
        }
      );
    }
  );
});







// 📌 GET /grades/:subject_id → Get Grades for a Subject
app.get("/grades/student/:student_id", (req, res) => {
  const { student_id } = req.params;

  console.log(`🔹 Fetching grades for student ${student_id}`);

  db.query(
    `SELECT g.student_id, s.name AS student_name, g.subject_id, sub.name AS subject, 
            g.cat1, g.cat2, g.endterm_exam, g.final_score, g.final_grade
     FROM grades g 
     JOIN student_record s ON g.student_id = s.id
     JOIN subjects sub ON g.subject_id = sub.id
     WHERE g.student_id = ?`,
    [student_id],
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching student grades:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        console.warn(`⚠️ No grades found for student ${student_id}`);
        return res.status(404).json({ error: "No grades found" });
      }

      console.log("✅ Student grades fetched successfully:", results);
      res.json(results);
    }
  );
});


// 📌 GET /grades/student/:student_id → Get a Student's Grades
app.get("/grades/fetch/:student_id", authenticateToken, (req, res) => {
  const { student_id } = req.params;

  console.log(`🔹 Fetching grades for student ${student_id}`);

  db.query(
    `SELECT g.subject_id, sub.name AS subject, g.cat1, g.cat2, g.endterm_exam, g.final_score, g.final_grade
     FROM grades g
     JOIN subjects sub ON g.subject_id = sub.id
     WHERE g.student_id = ?`,
    [student_id],
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching student grades:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        console.warn(`⚠️ No grades found for student ${student_id}`);
        return res.status(404).json({ error: "No grades found" });
      }

      console.log("✅ Grades fetched successfully:", results);
      res.json(results);
    }
  );
});





app.get("/api/fetch/students", authenticateToken, (req, res) => { 
  const { subject, grade_level } = req.query;

  // console.log("🔹 Full req.user object:", req.user);

  const userId = req.user?.userId; // Extracted from JWT
  // console.log("🔹 Extracted userId:", userId);

  if (!userId) {
    // console.error("❌ Missing or invalid userId in req.user");
    return res.status(401).json({ error: "Unauthorized: Invalid userId" });
  }

  if (!subject || !grade_level) {
    // console.error("❌ Missing subject or grade_level");
    return res.status(400).json({ error: "Subject and grade level are required" });
  }

  // 🔹 Step 1: Get Teacher's School ID
  db.query(
    "SELECT School_ID FROM teacher WHERE User_ID = ?",
    [userId],
    (err, teacherResults) => {
      if (err) {
        // console.error("❌ Error fetching teacher's School_ID:", err.message);
        return res.status(500).json({ error: err.message });
      }

      if (teacherResults.length === 0) {
        // console.warn("⚠️ No teacher found for User_ID:", userId);
        return res.status(404).json({ error: "Teacher not found" });
      }

      const schoolId = teacherResults[0].School_ID;
      // console.log("✅ Teacher's School_ID:", schoolId);

      // 🔹 Step 2: Verify Subject & Grade Level in `timetable` (Using Subject Name)
      db.query(
        `SELECT id FROM timetable WHERE subject = ? AND grade_level = ? `,
        [subject, grade_level],
        (err, timetableResults) => {
          if (err) {
            // console.error("❌ Error checking timetable:", err.message);
            return res.status(500).json({ error: err.message });
          }

          if (timetableResults.length === 0) {
            // console.warn("⚠️ Subject not assigned for grade level in timetable:", { subject, grade_level, schoolId });
            return res.status(404).json({ error: "Subject not assigned for this grade level" });
          }

          // console.log("✅ Grade Level & Subject Verified in Timetable");

          // 🔹 Step 3: Fetch Students from `student_record`
          db.query(
            `SELECT sr.Student_ID AS Student_ID, sr.First_Name, sr.Second_Name, 
                    g.cat1, g.cat2, g.endterm_exam 
             FROM student_record sr
             LEFT JOIN grades g ON sr.Student_ID = g.student_id AND g.subject_id = (
                 SELECT id FROM subjects WHERE name = ?
             )
             WHERE sr.Year_level = ? AND sr.School_ID = ?`,
            [subject, grade_level, schoolId],
            (err, studentResults) => {
              if (err) {
                // console.error("❌ Error fetching students:", err.message);
                return res.status(500).json({ error: err.message });
              }

              // console.log("✅ Students fetched:", studentResults.length);
              res.json(studentResults);
            }
          );
        }
      );
    }
  );
});







// 📌 POST /grades/upload → Bulk Upload Grades via CSV
const storage = multer.memoryStorage();
const uploadcsv = multer({ storage });

app.post("/grades/uploadcsv", uploadcsv.single("file"), (req, res) => {
  const fileBuffer = req.file.buffer.toString("utf8");
  const rows = fileBuffer.split("\n").slice(1); // Skip header row

  rows.forEach((row) => {
    const [student_id, subject_id, teacher_id, cat1, cat2, endterm_exam, term, year] = row.split(",");

    db.query(
      `INSERT INTO grades (Student_ID, subject_id, Teacher_ID, cat1, cat2, endterm_exam, term, year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE cat1=?, cat2=?, endterm_exam=?`,
      [
        student_id, subject_id, teacher_id, cat1, cat2, endterm_exam, term, year,
        cat1, cat2, endterm_exam
      ],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
      }
    );
  });

  res.json({ message: "CSV uploaded successfully" });
});

app.post("/api/teacher/mark-attendance", authenticateToken, (req, res) => {
  const { subject, start_time, end_time, attendance } = req.body;
  const userId = req.user?.userId;

  // Fetch the Teacher_ID using User_ID
  const teacherQuery = "SELECT Teacher_ID FROM teacher WHERE User_ID = ?";

  db.query(teacherQuery, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error while fetching teacher ID" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const teacherId = results[0].Teacher_ID; // Extract the teacher ID

    // Prepare attendance values
    const values = Object.entries(attendance).map(([studentId, present]) => [
      studentId,
      teacherId,
      subject,
      present ? "Present" : "Absent",
      new Date(),
      start_time,
      end_time,
    ]);

    const attendanceQuery = `
      INSERT INTO attendance (Student_ID, Teacher_ID, Subject, Status, Lesson_Date, Start_Time, End_Time) 
      VALUES ?
    `;

    db.query(attendanceQuery, [values], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error while inserting attendance" });
      }
      res.json({ message: "Attendance marked successfully" });
    });
  });
});


//Chats

// Fetch user chats
app.get("/chats", authenticateToken, (req, res) => {
  const userId = req.user?.userId; // Get the user ID from the authenticated token
  // console.log("Received request to fetch chats for userId:", userId); // Log user ID

  if (!userId) {
    // console.log("Error: User not authenticated.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    SELECT c.id, c.participant1_id, c.participant2_id, c.last_updated, 
      CASE 
        WHEN c.participant1_id = ? THEN uc2.Username
        ELSE uc1.Username
      END AS participant_name,
      m.message AS last_message
    FROM chats c
    JOIN user_credentials uc1 ON c.participant1_id = uc1.User_ID
    JOIN user_credentials uc2 ON c.participant2_id = uc2.User_ID
    LEFT JOIN messages m ON c.id = m.chat_id 
      AND m.timestamp = (
        SELECT MAX(timestamp) FROM messages WHERE chat_id = c.id
      )
    WHERE c.participant1_id = ? OR c.participant2_id = ?
    ORDER BY c.last_updated DESC
  `;

  db.query(query, [userId, userId, userId], (err, chats) => {
    if (err) {
      console.error("Error fetching chats:", err.message);
      return res.status(500).json({ error: err.message });
    }

    // console.log("Chats fetched from database:", chats); // Log fetched chats
    res.json(chats); // Respond with the fetched chats
  });
});



// Fetch messages in a chat
app.get("/chats/:chat_id/messages", (req, res) => {
  const { chat_id } = req.params;
  // console.log("Received request for messages in chat:", chat_id);

  db.query(
    `SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC`,
    [chat_id],
    (err, messages) => {
      if (err) {
        console.error("Error fetching messages:", err.message);
        return res.status(500).json({ error: err.message });
      }

      // console.log("Messages fetched from database:", messages);
      res.json(messages);
    }
  );
});


// Send a message
app.post("/chats/:chat_id/messages", authenticateToken, (req, res) => {
  const { chat_id } = req.params;
  const { message } = req.body; // Removed sender_id from body
  const userId = req.user?.userId; // Get userId from token

  // Check if message is provided
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Insert message into the messages table
  db.query(
    `INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)`,
    [chat_id, userId, message],
    (err) => {
      if (err) {
        console.error("Error inserting message:", err.message);
        return res.status(500).json({ error: err.message });
      }

      // Update the last message in the chats table
      db.query(
        `UPDATE chats SET last_message = ?, last_updated = NOW() WHERE id = ?`,
        [message, chat_id],
        (err) => {
          if (err) {
            console.error("Error updating chat:", err.message);
            return res.status(500).json({ error: err.message });
          }

          // Respond with success
          res.json({ success: true, message: "Message sent successfully" });
        }
      );
    }
  );
});



// WebSocket for real-time messages




//New chat
app.post("/newchats", authenticateToken, (req, res) => {
  const userId = req.user?.userId; // Get userId from token
  const { user2 } = req.body; // user2 comes from the body

  console.log("Received request to create chat between:", { userId, user2 });

  // Check if a chat already exists between these users
  db.query(
    "SELECT id FROM chats WHERE (participant1_id = ? AND participant2_id = ?) OR (participant1_id = ? AND participant2_id = ?)",
    [userId, user2, user2, userId], // Use `userId` for participant1_id
    (err, existingChat) => {
      if (err) {
        console.error("Error checking existing chat:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log("Existing chat check result:", existingChat);

      if (existingChat.length > 0) {
        console.log("Chat already exists:", existingChat[0]);
        return res.json(existingChat[0]); // Return existing chat
      }

      // Create a new chat session in the chats table
      db.query(
        "INSERT INTO chats (participant1_id, participant2_id) VALUES (?, ?)",
        [userId, user2], // Insert chat with userId as participant1
        (err, result) => {
          if (err) {
            console.error("Error creating chat:", err);
            return res.status(500).json({ error: "Internal server error" });
          }

          console.log("New chat created with ID:", result.insertId);
          res.json({ id: result.insertId, user1: userId, user2, messages: [] });
        }
      );
    }
  );
});




app.get("/users", (req, res) => {
  const { role } = req.query;

  // Debug: Log the received role parameter
  console.log("Received role query param:", role);

  if (!role) {
    return res.status(400).json({ error: "Role parameter is required" });
  }

  const roles = role.split(","); // Convert role query param to an array

  // Debug: Log the processed roles array
  console.log("Processed roles array:", roles);

  db.query("SELECT User_ID, Username FROM user_credentials WHERE role IN (?)", [roles], (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Debug: Log the retrieved users
    console.log("Fetched users:", users);

    res.json(users);
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
