import { useEffect, useState } from "react";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      try {
        const response = await fetch("http://localhost:3000/api/announcements", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Announcements:", data); // Log the data
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Announcements</h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div
            key={announcement.Announcement_ID} // Adjust based on your DB structure
            className="p-3 border rounded-md mb-2  even:bg-purple-100 odd:bg-green-100"
          >
            <h1 className="font-semibold text-xl">📢 {announcement.Title} {/* Adjust if column name differs */}</h1>
            
            <p className="text-sm text-gray-400  ">{announcement.Content}</p>
          </div>
        ))
      ) : (
        <p>No announcements available</p>
      )}
    </div>
  );
};

export default AnnouncementSection;
