import React, { useState } from "react";
import { Button } from "antd";
import TeacherCreation from "../Components/TeacherCreation"
import { FaPlus } from "react-icons/fa";

const TeacherManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <div className="mt-4">
      {/* Button to Open Modal */}
      <Button
        
        onClick={handleOpen}
        className="w-[200px] h-[70px] bg-white shadow-md"
      >
        <FaPlus />
        <span className="text-xl font-light">
            Create Teacher
        </span>
      </Button>

      {/* Teacher Creation Modal */}
      <TeacherCreation visible={isModalVisible} onClose={handleClose} />
    </div>
  );
};

export default TeacherManagement;
