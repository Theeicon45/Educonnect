import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdmissionTrend from "../Components/AdmissionTrend";
import ExamResultsTable from "../Components/ExamResultsTable";
import FundsSource from "../Components/FundsSource";
import PopulationStats from "../Components/PopulationStats";
import StudentDistribution from "../Components/studentdistribution";

const ReportAnalytics = () => {
   const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.role.toLowerCase() !== "admin") {
        navigate("/login"); // Redirect to login if role is not Admin
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div>
      <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PopulationStats type="Admins" />
        <PopulationStats type="Students" />
        <PopulationStats type="Teachers" />
        <PopulationStats type="Non Teaching Staff" />
      </div>
      <div className="flex items-center mt-2 gap-4 mb-4 ">
        {/* Left */}
        <div className="w-1/2">
          <StudentDistribution />
        </div>
        {/* Right */}
        <div className="w-1/2">
          <AdmissionTrend />
        </div>
      </div>
      <div className="flex items-start gap-8 ">
        {/* Left */}
        <div className="w-1/3">
        
        <FundsSource/>
        </div>
        {/* RIght */}
        <div className="w-2/3">
        <ExamResultsTable/>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
