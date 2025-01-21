import { useState, useEffect } from 'react';
import ProfileManagement from './ProfileManagement';

const ProfileView = () => {
  const [profile, setProfile] = useState({ Name: '', Username: '', Role: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT in header
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
  
        const data = await response.json();
        console.log('Fetched Profile Data:', data); // Add this line to check the response structure
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, []);
  
  return (
    <div className="p-4">
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h1 id="landing-text" className="text-3xl font-semibold">
          Welcome, Admin {profile.Name}!
        </h1>
        <p className="text-gray-600 font-semibold">Username: {profile.Username}</p>
        {profile.Role && <p className="text-gray-600 font-semibold">Role: {profile.Role}</p>}

        <ProfileManagement/>
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default ProfileView;
