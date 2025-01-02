import  { useState } from "react";
import { Button } from "antd";
import { FaPlus } from "react-icons/fa";
import CreateAnnouncement from "./CreateAnnouncement";

const AnnouncementManager = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <div className="mt-4">
      {/* Button to Open Modal */}
      <Button onClick={handleOpen} className="w-[200px] h-[70px] bg-white">
        <FaPlus />
        <span className="text-xl text-left font-light">Create <br /> Announcement</span>
      </Button>

      {/* Create Announcement Modal */}
      <CreateAnnouncement visible={isModalVisible} onClose={handleClose} />
    </div>
  );
};

export default AnnouncementManager;
