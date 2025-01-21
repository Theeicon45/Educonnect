import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Upload, Button, message, Image } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import Cropper from "react-cropper"; // Import Cropper
import "cropperjs/dist/cropper.css"; // Import Cropper styles

const ProfileEditModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [profileData, setProfileData] = useState({});
  const [croppedImage, setCroppedImage] = useState(null); // Store cropped image
  const cropperRef = useRef(null); // Reference to the Cropper component

  // Fetch profile data on modal open
  useEffect(() => {
    if (visible) {
      const fetchProfile = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
            form.setFieldsValue({
              name: data.Name,
              email: data.Email,
            });
            if (data.ProfilePicture) {
              setImageUrl(`http://localhost:3000${data.ProfilePicture}`);
            }
          } else {
            message.error("Failed to fetch profile details.");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          message.error("An error occurred while fetching profile data.");
        }
      };

      fetchProfile();
    }
  }, [visible]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setImageUrl(URL.createObjectURL(file));
      setCroppedImage(null); // Reset the cropped image when a new file is selected
    } else {
      setImageUrl("");
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper; // Access the Cropper instance
      const croppedCanvas = cropper.getCroppedCanvas(); // Get the cropped canvas
      setCroppedImage(croppedCanvas.toDataURL()); // Store the cropped image as a Data URL
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Add form values to FormData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Add the cropped image to FormData if it exists
      if (croppedImage) {
        const blob = dataURLToBlob(croppedImage);
        formData.append("profilePicture", blob, "profile-pic.jpg");
      } else if (fileList.length > 0) {
        formData.append("profilePicture", fileList[0].originFileObj);
      }

      const response = await fetch("http://localhost:3000/api/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      message.success("Profile updated successfully!");
      form.resetFields();
      setFileList([]);
      setCroppedImage(null); // Clear cropped image after successful upload
      onClose();
    } catch (error) {
      console.error(error);
      message.error(error.message || "Failed to update profile.");
    }
  };

  // Utility function to convert DataURL to Blob
  const dataURLToBlob = (dataURL) => {
    const [header, base64] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      {/* Profile Picture Placeholder */}
      <div className="flex flex-col items-center mb-4">
        <div
          className="flex items-center justify-center bg-gray-200 rounded-full overflow-hidden"
          style={{ width: 120, height: 120 }}
        >
          {croppedImage ? (
            <Image
              src={croppedImage}
              alt="Profile Picture"
              preview={false}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt="Profile Picture"
              preview={false}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <UserOutlined style={{ fontSize: "50px", color: "#999" }} />
          )}
        </div>

        {/* Show Cropper if image is available */}
        {imageUrl && !croppedImage && (
          <>
            <Cropper
              src={imageUrl}
              style={{ width: "100%", height: 300 }}
              initialAspectRatio={1}
              guides={false}
              ref={cropperRef}
            />
            <Button onClick={handleCrop} className="mt-2">
              Crop Image
            </Button>
          </>
        )}

        <Upload
          accept="image/*"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleUploadChange}
          showUploadList={false} // Hides default file list
        >
          <Button icon={<UploadOutlined />} className="mt-2">
            Change Picture
          </Button>
        </Upload>
      </div>

      {/* Edit Form */}
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileEditModal;
