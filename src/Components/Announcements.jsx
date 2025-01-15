import { useState, useEffect } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch announcements on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await fetch('http://localhost:3000/api/announcements', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          alert('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        alert('Error fetching announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading screen
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className='text-xl font-semibold'>Announcements</h1>
        <span className="text-xs text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.Announcement_ID} // Use Announcement_ID for unique key
              className=" odd:bg-purple-200 even:bg-yellow-200 rounded-md p-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.Title}</h2> {/* Use Title */}
                <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                  {new Date(announcement.Expiry_Date).toLocaleDateString()} {/* Format Expiry_Date */}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{announcement.Content}</p> {/* Use Content */}
            </div>
          ))
        ) : (
          <div>No announcements found.</div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
