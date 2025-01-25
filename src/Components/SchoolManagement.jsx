import  { useState } from "react";
import { Button } from "antd";

import { FaPlus } from "react-icons/fa";
import SchoolCreation from "./SchoolCreation";

const SchoolManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <div className="mt-4">
      <Button
        onClick={handleOpen}
        className="w-[200px] h-[70px] bg-white shadow-md"
      >
        <FaPlus />
        <span className="text-xl font-light">Create School</span>
      </Button>

      <SchoolCreation visible={isModalVisible} onClose={handleClose} />
    </div>
  );
};

export default SchoolManagement;
