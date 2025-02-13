import React, { useEffect, useState } from "react";
import { manavatar } from "../Utils/images";
import FeeViewer from "./FeeViewer";

const FinanceViewer = () => {
    const [ProfilePicture, setProfilePicture] = useState(null); // State for the profile picture
  const [userData, setUserData] = useState({ Role: "", Name: "" });
  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await fetch("http://localhost:3000/api/welcome", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT in header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch welcome data");
        }

        const data = await response.json();
        console.log("Fetched Welcome Data:", data); // Debugging
        setUserData(data);
      } catch (error) {
        console.error("Error fetching welcome data:", error);
      }
    };

    fetchWelcomeData();
  }, []);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get-student-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log("Profile Picture Data:", data);
          setProfilePicture(`http://localhost:3000${data.picturePath}`); // Update state with the picture URL
          // console.log(data)
        } else {
          console.error(
            "Failed to fetch profile picture:",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <div className="">
      <div className="">
      <img
            src={ProfilePicture || manavatar} // Use the fetched profile picture or fallback to manavatar
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full"
          />
        <h1 id="landing-text">
          {userData.Role} ,{userData.Name}!
        </h1>
        <FeeViewer/>
      </div>
    </div>
  );
};

export default FinanceViewer;
