import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

const DashboardOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActions, setFilteredActions] = useState([]);
  const navigate = useNavigate();

  // Hardcoded actions for dashboard and sidebar
  const actions = [
    { name: 'Dashboard Overview', path: '/DashboardOverview' },
    { name: 'Student Management', path: '/StudentManagement' },
    { name: 'Staff Management', path: '/StaffManagement' },
    { name: 'Admission Management', path: '/AdmissionManagement' },
    { name: 'Communication Center', path: '/CommunicationCenter' },
    { name: 'Report Analytics', path: '/ReportAnalytics' },
    { name: 'Help Center', path: '/HelpCenter' },
    { name: 'Resource Sharing', path: '/ResourceSharing' },
    { name: 'Financial Records', path: '/FinanceManagement' },
    { name: 'Settings', path: '/settings' },
    // Add more actions as needed
  ];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter actions based on the search term
    const results = actions.filter((action) =>
      action.name.toLowerCase().includes(term)
    );
    setFilteredActions(results);
  };

  const handleSelectAction = (path) => {
    // Navigate to the selected action's path
    navigate(path);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className='flex '>
      <BsSearch  style={{
        position: 'relative',
        left: '30px', // Adjust to position it correctly inside the input
        
       
      }} className='mt-3'/>
      <input
        type="text"
        placeholder="Search actions..."
        value={searchTerm}
        onChange={handleSearch}
        className="rounded-full h-9 p-2 pl-10 w-3/4   focus:outline-none focus:ring-2 focus:ring-tahiti-500"
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
                  cursor: 'pointer',
                  padding: '8px',
                  borderBottom: '1px solid #ccc',
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
  );
};

export default DashboardOverview;
