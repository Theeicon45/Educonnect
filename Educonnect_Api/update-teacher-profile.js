import jwt from "jsonwebtoken";
import fs from "fs";
import db from "./dbConfig.js"; // Ensure this points to your database connection
import multer from "multer";

export default function updateTeacherProfileAPI(app) {
  // Configure Multer for file uploads
  const storage = multer.diskStorage({
    destination: "./uploads/profile_pictures/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const profilePicUpload = multer({ storage });

  app.put(
    "/api/update-teacher-profile",
    profilePicUpload.single("profilePicture"),
    (req, res) => {
      // Extract token from headers and decode it
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
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
        const updateTeacherQuery = `
          UPDATE teacher 
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
        db.query(updateTeacherQuery, [firstName, secondName, userId], (err) => {
          if (err) {
            console.error("Error updating teacher details:", err);
            return res
              .status(500)
              .json({ error: "Failed to update teacher details" });
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
                  console.error(
                    "Error fetching previous profile picture:",
                    err
                  );
                  return res
                    .status(500)
                    .json({
                      error: "Failed to fetch previous profile picture",
                    });
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
                      // Continue updating even if file deletion fails
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
}
