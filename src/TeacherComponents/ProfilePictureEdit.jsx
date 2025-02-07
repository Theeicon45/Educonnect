import { useState, useRef } from "react";
import { Modal, Button, Upload, message, Image } from "antd";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { UploadOutlined } from "@ant-design/icons";
import { manavatar } from "../Utils/images"; // Default avatar image

const ProfilePictureEdit = ({ visible, onClose, onSave }) => {
  const [image, setImage] = useState(null); // Store uploaded image URL
  const [croppedImage, setCroppedImage] = useState(null); // Store cropped image URL
  const cropperRef = useRef(null); // Reference for the Cropper component

  // Handle file selection
  const handleFileChange = (info) => {
    const file = info.fileList[0]?.originFileObj; // Get selected file
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create a temporary URL
      setImage(fileURL); // Set image for cropping
      setCroppedImage(null); // Reset cropped image
    }
  };

  // Crop the image
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper; // Get the cropper instance
      const croppedCanvas = cropper.getCroppedCanvas(); // Get the cropped canvas
      if (croppedCanvas) {
        setCroppedImage(croppedCanvas.toDataURL()); // Convert to DataURL for preview
      }
    }
  };

  // Handle Save
  const handleSave = () => {
    if (croppedImage) {
      onSave(croppedImage); // Send cropped image to parent
      message.success("Profile picture updated!");
      onClose(); // Close the modal
    } else {
      message.error("Please crop the image before saving.");
    }
  };

  return (
    <Modal title="Edit Profile Picture" open={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col items-center">
        {/* Profile Picture Display */}
        <div className="w-[120px] h-[120px] mb-4">
          <Image
            src={croppedImage || image || manavatar} // Show cropped image, uploaded image, or fallback to default (manavatar)
            alt="Profile Avatar"
            preview={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%", // Circular avatar
            }}
          />
        </div>

        {/* Upload Button */}
        <Upload 
          accept="image/*"
          showUploadList={false} 
          beforeUpload={() => false} 
          onChange={handleFileChange} // Ensure file selection works
        >
          <Button icon={<UploadOutlined />}>Upload New Picture</Button>
        </Upload>

        {/* Image Cropper */}
        {image && (
          <div className="mt-4">
            <Cropper
              src={image}
              style={{ width: "100%", height: 300 }}
              initialAspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
              aspectRatio={1} // Ensure cropping is square
            />
            <Button onClick={handleCrop} className="mt-2">
              Crop
            </Button>
          </div>
        )}

        {/* Save and Cancel Buttons */}
        <div className="mt-4 flex gap-4">
          <Button type="primary" onClick={handleSave} disabled={!croppedImage}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePictureEdit;
