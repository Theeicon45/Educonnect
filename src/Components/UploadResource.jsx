import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { Button } from "antd";
import MediaUploadModal from './MediaUpload';

const UploadResource = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);
  return (
    <div>
       <div className="mt-4">
      <Button
        onClick={handleOpen}
        className="w-[200px] h-[70px] bg-white flex items-center justify-center"
      >
        <FaPlus className="mr-2" />
        <span className="text-xl font-light">Upload Media</span>
      </Button>
      <MediaUploadModal visible={isModalVisible} onClose={handleClose} />
    </div>
    </div>
  )
}

export default UploadResource
