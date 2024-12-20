import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    applicantName: "",
    dateOfBirth: "",
    gender: "",
    gradeLevelApplied: "",
    guardianName: "",
    guardianContact: "",
    previousSchool: "",
    applicationDate: "",
    preferredSchool: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Application submitted successfully:", result);
      alert("Application submitted successfully!");
      // Optionally reset the form
      setFormData({
        applicantName: "",
        dateOfBirth: "",
        gender: "",
        gradeLevelApplied: "",
        guardianName: "",
        guardianContact: "",
        previousSchool: "",
        applicationDate: "",
        preferredSchool: "",
        remarks: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
  };
  const [schools, setSchools] = useState([]); // State for schools

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/schools");
        const data = await response.json();
        console.log("Fetched Schools:", data);
        setSchools(data); // Set the schools state with the fetched data
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white rounded shadow-md"
      >
        <Link to="/">
          <FaArrowLeft className="icon hover:text-tahiti-400 active:text-tahiti-800" />
        </Link>
        <h2 className="text-center text-xl font-bold mb-4">Application Form</h2>

        {/* Input fields */}
        <div className="mb-4">
          <label className="block mb-1">Applicant Name</label>
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Grade Level Applied</label>
          <input
            type="number"
            name="gradeLevelApplied"
            value={formData.gradeLevelApplied}
            onChange={handleChange}
            required
            min="1"
            max="12"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Guardian Name</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Guardian Contact</label>
          <input
            type="tel"
            name="guardianContact"
            value={formData.guardianContact}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Previous School</label>
          <input
            type="text"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Application Date</label>
          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Any remarks or additional information"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Preferred School</label>
          <select
            name="preferredSchool"
            value={formData.preferredSchool}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select School</option>
            {schools.map((school) => (
              <option key={school.School_ID} value={school.School_Name}>
                {school.School_Name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-tahiti-500 text-white p-2 rounded hover:bg-tahiti-600 transition-colors duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
