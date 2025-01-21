import React, { useState } from 'react';
import { Button, message } from 'antd';
import { FaPen } from 'react-icons/fa'; // Import the edit icon
import ProfileEditModal from './ProfileEditModal';

const ProfileManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <div >
      <div >
      
        
        {/* Edit Profile and Picture Buttons */}
        <div className="mt-4">
          <Button
            onClick={handleOpenModal}
            className="p-2 bg-blue-500 text-white rounded flex items-center"
          >
            <FaPen className="mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Modal for Editing Profile */}
        <ProfileEditModal
          visible={isModalVisible}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default ProfileManagement;
