import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpensePieChart from "../Components/ExpensePieChart";
import FeeData from "../Components/FeeData";
import FeesTable from "../Components/FeesTable";

const FinanceManagement = () => {
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
      <div className=" flex items-center w-full my-4">
        {/* Right */}
        <div className="w-1/2">
          <FeeData />
        </div>
        {/* Left */}
        <div className="w-1/2 rounded-lg bg-purple-100 h-full p-6">

        <ExpensePieChart/>
        </div>
      </div>
      <FeesTable />
    </div>
  );
};

export default FinanceManagement;
