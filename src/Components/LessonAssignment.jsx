import axios from "axios";
import React, { useEffect, useState } from "react";

const LessonAssignment = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([
    " 1", " 2", " 3", " 5", " 6", 
    " 7", " 8", " 9", " 10", " 11", " 12"
  ]);
  const [formData, setFormData] = useState({
    teacher_id: "",
    subject: "",
    grade_level: "",
    weekday: "Monday",
    start_time: "",
    end_time: "",   // Added End Time field
    location: "",
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teachers");
        console.log("Fetched Teachers:", response.data);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/subjects");
        console.log("Fetched Subjects:", response.data);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchTeachers();
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin/assign-subject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Lesson assigned successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error assigning lesson:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Assign Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher Selection */}
        <div>
          <label className="block text-gray-700">Teacher</label>
          <select name="teacher_id" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.Teacher_ID} value={teacher.Teacher_ID}>
                {teacher.First_Name} {teacher.Last_Name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block text-gray-700">Subject</label>
          <select name="subject" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.name}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Grade Level Selection */}
        <div>
          <label className="block text-gray-700">Grade Level</label>
          <select name="grade_level" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Grade</option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Weekday Selection */}
        <div>
          <label className="block text-gray-700">Weekday</label>
          <select name="weekday" onChange={handleChange} className="w-full p-2 border rounded">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time Input */}
        <div>
          <label className="block text-gray-700">Start Time</label>
          <input type="time" name="start_time" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* End Time Input */}
        <div>
          <label className="block text-gray-700">End Time</label>
          <input type="time" name="end_time" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Assign Lesson
        </button>
      </form>
    </div>
  );
};

export default LessonAssignment;
