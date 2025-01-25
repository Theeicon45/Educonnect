import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { messages, notifocations, manavatar } from "../Utils/images"; // Keep manavatar placeholder for fallback

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActions, setFilteredActions] = useState([]);
  const [ProfilePicture, setProfilePicture] = useState(null); // State for the profile picture
  const navigate = useNavigate();

  const actions = [
    { name: "Dashboard Overview", path: "/DashboardOverview" },
    { name: "Student Management", path: "/StudentManagement" },
    { name: "Staff Management", path: "/StaffManagement" },
    { name: "Admission Management", path: "/AdmissionManagement" },
    { name: "Communication Center", path: "/CommunicationCenter" },
    { name: "Report Analytics", path: "/ReportAnalytics" },
    { name: "Help Center", path: "/HelpCenter" },
    { name: "Resource Sharing", path: "/ResourceSharing" },
    { name: "Financial Records", path: "/FinanceManagement" },
    { name: "Settings", path: "/settings" },
  ];

  // Fetch the profile picture
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Profile Picture Data:", data);
          setProfilePicture(`http://localhost:3000${data.ProfilePicture}`); // Update state with the picture URL
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const results = actions.filter((action) =>
      action.name.toLowerCase().includes(term)
    );
    setFilteredActions(results);
  };

  const handleSelectAction = (path) => {
    navigate(path);
  };

  return (
    <div className="flex">
      <div className="w-full">
        {/* Search Bar */}
        <div className="flex w-full">
          <BsSearch
            style={{
              position: "relative",
              left: "30px",
            }}
            className="mt-3"
          />
          <input
            type="text"
            placeholder="Search actions..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-full h-9 p-2 pl-10 w-[60%] focus:outline-none focus:ring-2 focus:ring-tahiti-500"
          />
        </div>

        {/* Display Search Results */}
        {searchTerm && (
          <div className="search-results">
            {filteredActions.length > 0 ? (
              filteredActions.map((action, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectAction(action.path)}
                  className="search-result-item"
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {action.name}
                </div>
              ))
            ) : (
              <p>No matching actions found</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <img src={messages} alt="Messages" width={16} height={16} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <img src={notifocations} alt="Notifications" width={16} height={16} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-cyan-300 rounded-full">
            1
          </div>
        </div>
        <div
          className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <img
            src={ProfilePicture || manavatar} // Use the fetched profile picture or fallback to manavatar
            alt="Profile"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
