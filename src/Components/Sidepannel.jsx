import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaCommentDots, FaChartBar, FaFolderOpen, FaCog, FaAngleRight,FaAngleLeft } from 'react-icons/fa';
import { MdSchool, MdLogout } from 'react-icons/md';
import { AiOutlineInfoCircle,  } from 'react-icons/ai';
import { IconBlack } from '../Utils/images';

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
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session data (e.g., local storage)
    localStorage.removeItem('authToken'); // replace 'authToken' with your token or session key
    // Redirect to login page
    navigate('/Login');
  };

  const handleMouseLeave = () => {
    if (!isSticky) setIsExpanded(false);
  };
  

  return (
    <div className="flex ">
      {/* Sidebar Container */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-48' : 'w-16'
        }  h-screen  fixed flex flex-col`}
        style={{ zIndex: '10', marginRight: isExpanded ? '10px' : '0' }}
      >
        {/* Logo and Title */}
        <div className={`flex items-center mb-8  ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <img src={IconBlack} alt="Educonnect Logo" className="w-10 h-10" />
          {isExpanded && <p className="text-cyan-400 text-xl ml-2">Educonnect</p>}
        </div>

        {/* Navigation Links with Hidden Scrollbar */}
        <div className="scrollable flex flex-col overflow-y-auto bg-scroll gap-6 h-full pl-2 ">
          <Link to="/DashboardOverview" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaTachometerAlt className="text-xl" />
            {isExpanded && <span>Dashboard <br />Overview</span>}
          </Link>
          <Link to="/AdmissionManagement" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <MdSchool className="text-xl" />
            {isExpanded && <span>Admission  <br/> Management</span>}
          </Link>
          <Link to="/StudentManagement" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaUserGraduate className="text-xl" />
            {isExpanded && <span>Student <br/>  Management</span>}
          </Link>
          <Link to="/StaffManagement" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaChalkboardTeacher className="text-xl" />
            {isExpanded && <span>Staff  <br/> Management</span>}
          </Link>
          <Link to="/FinanceManagement" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaMoneyBillWave className="text-xl" />
            {isExpanded && <span>Finance <br/>  Management</span>}
          </Link>
          <Link to="/CommunicationCenter" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaCommentDots className="text-xl" />
            {isExpanded && <span>Communication  <br/> Center</span>}
          </Link>
          <Link to="/ReportAnalytics" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaChartBar className="text-xl" />
            {isExpanded && <span>Report  <br/> Analytics</span>}
          </Link>
          <Link to="/ResourceSharing" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaFolderOpen className="text-xl" />
            {isExpanded && <span>Resource  <br/> Sharing</span>}
          </Link>
          <Link to="/HelpCenter" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <AiOutlineInfoCircle className="text-xl" />
            {isExpanded && <span>Help  <br/> Center</span>}
          </Link>
          <Link to="/Settings" className="flex items-center gap-4 hover:bg-tahiti-100 rounded-md w-full">
            <FaCog className="text-xl" />
            {isExpanded && <span>Settings</span>}
          </Link>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout } className="mt-4 flex items-center gap-4 text-Red-500 p-4 hover:bg-Orange-100">
          <MdLogout className="text-xl" />
          {isExpanded && <span>Logout</span>}
        </button>

        {/* Toggle Button */}
        <button
          onClick={toggleSticky}
          className="absolute right-0 top-4 -mr-6 p-1  transition-all"
        >
          {isExpanded ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      
      </div>


      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out`}
        style={{ marginLeft: isExpanded ? '200px' : '70px', paddingRight: '10px' }}
      >
        {/* Content here dynamically adjusts based on sidebar's state */}
       
      </div>
    </div>
  );
};

export default Sidepannel;
