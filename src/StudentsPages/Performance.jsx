import React, { useState, useEffect } from "react";
import PerformanceChart from "../StudentComponents/PerformanceChart";
import PerformanceTable from "../StudentComponents/PerformanceTable";
import ClipLoader from "react-spinners/ClipLoader";

const Performance = () => {
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [studentName, setStudentName] = useState(""); // Store student name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      console.error("No token found in localStorage");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        // Fetch student name from /api/welcome
        const nameResponse = await fetch("http://localhost:3000/api/welcome", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!nameResponse.ok) throw new Error("Failed to fetch student name");

        const nameData = await nameResponse.json();
        console.log('majina',nameData)
        setStudentName(nameData.Name); // Assuming API returns { name: "John Doe" }

        // Fetch student grades from /api/getgrades
        const gradesResponse = await fetch("http://localhost:3000/api/getgrades", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!gradesResponse.ok) throw new Error("Failed to fetch grades");

        const gradesData = await gradesResponse.json();
        setStudentSubjects(gradesData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row gap-8 mt-4">
        {/* Left */}
        <div className="w-1/2 h-[500px] bg-white rounded-lg p-4">
          <h1 className="font-semibold text-xl">Student Performance</h1>
          <PerformanceChart subjects={studentSubjects} />
        </div>
        {/* Right */}
        <div className="w-1/2 h-[500px] bg-white rounded-lg p-4">
          {loading ? <p><ClipLoader /></p> : <PerformanceTable studentName={studentName} subjects={studentSubjects} />}
        </div>
      </div>
    </div>
  );
};

export default Performance;
