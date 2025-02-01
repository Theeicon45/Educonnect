import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCommentDots,
  FaChartBar,
  FaFolderOpen,
  FaCog,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import { MdSchool, MdLogout } from "react-icons/md";
import { IconBlack } from "../Utils/images";

const Sidepannel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSticky = () => {
    setIsSticky((prev) => !prev);
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    if (!isSticky) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isSticky) setIsExpanded(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // replace 'authToken' with your token or session key
    navigate("/Login");
  };

  // Define an array of links
  const navigationLinks = [
    {
      to: "/StudentDashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard ",
    },
    {
      to: "/SFinance",
      icon: <FaMoneyBillWave />,
      label: "Finance",
    },
    {
      to: "/Performance",
      icon: <FaChartBar />,
      label: "Performance",
    },
   
   
    {
      to: "/SCommunicationHub",
      icon: <FaCommentDots />,
      label: "Communication Center",
    },
    {
      to: "SResourceCenter",
      icon: <FaFolderOpen />,
      label: "Resource Center",
    },
    { to: "StudentSettings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex">
      {/* Sidebar Container */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-48" : "w-16"
        } h-screen fixed flex flex-col`}
        style={{ zIndex: "10", marginRight: isExpanded ? "10px" : "0" }}
      >
        {/* Logo and Title */}
        <div
          className={`flex items-center mb-8 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <img src={IconBlack} alt="Educonnect Logo" className="w-10 h-10" />
          {isExpanded && (
            <p className="text-cyan-400 text-xl ml-2">Educonnect</p>
          )}
        </div>

        {/* Navigation Links */}
        <div className="scrollable flex flex-col overflow-y-auto bg-scroll gap-6 h-full pl-2">
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full"
            >
              <span className="text-xl">{link.icon}</span>
              {isExpanded && <span>{link.label}</span>}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-4 text-Red-500 p-4 hover:bg-Orange-100"
        >
          <MdLogout className="text-xl" />
          {isExpanded && <span>Logout</span>}
        </button>

        {/* Toggle Button */}
        <button
          onClick={toggleSticky}
          className="absolute right-0 top-4 -mr-6 p-1 transition-all"
        >
          {isExpanded ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isExpanded ? "200px" : "70px",
          paddingRight: "10px",
        }}
      >
        {/* Content dynamically adjusts based on sidebar's state */}
      </div>
    </div>
  );
};

export default Sidepannel;
