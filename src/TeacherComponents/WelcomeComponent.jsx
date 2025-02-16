import { useState, useEffect } from "react";

const WelcomeComponent = () => {
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

  return (
    <div className="flex justify-center text-center items-center">
      <h1 id="landing-text" className=" flex justify-center text-center items-center">
        Welcome, {userData.Role} {userData.Name}!
      </h1>
    </div>
  );
};

export default WelcomeComponent;
