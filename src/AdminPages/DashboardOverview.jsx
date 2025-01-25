import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import '../styles/loader.scss';  // Import your SCSS file here

import Announcements from "../Components/Announcements";
import CountChart from "../Components/CountChart";
import EventCalendar from "../Components/EventCalendar";
import FinanceChart from "../Components/FinanceChart";
import PerformanceSc from "../Components/PerformanceSc";
import Usercards from "../Components/Usercards";

const DashboardOverview = () => {
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
    <div className="flex gap-4 p-4 md:flex-row">
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCards */}
        <div className="flex gap-4 justify-between pt-5 flex-wrap">
          <Usercards type="Student" />
          <Usercards type="Teacher" />
          <Usercards type="Parent" />
          <Usercards type="Staff" />
        </div>
        {/* MIDDLECHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHARTS */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* PERFORMANCE */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <PerformanceSc />
          </div>
        </div>
        {/* BOTTOM CHARTS */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default DashboardOverview;
