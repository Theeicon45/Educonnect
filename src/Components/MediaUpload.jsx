import { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const MediaUploadModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [thumbnailList, setThumbnailList] = useState([]);

  const handleUploadChange = ({ fileList }) => setFileList(fileList);
  const handleThumbnailChange = ({ fileList }) => setThumbnailList(fileList);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Add form values to FormData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Add files to FormData
      if (fileList[0]) {
        formData.append("media", fileList[0].originFileObj);
      }
      if (thumbnailList[0]) {
        formData.append("thumbnail", thumbnailList[0].originFileObj);
      }

      // Get the JWT token from localStorage (or wherever you store it)
      const token = localStorage.getItem('token'); // Replace with the actual token storage method

      // API Call
      const response = await fetch("http://localhost:3000/api/upload-resource", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resource");
      }

      message.success("Media uploaded successfully!");
      form.resetFields();
      setFileList([]);
      setThumbnailList([]);
      onClose();
    } catch (error) {
      console.error(error);
      message.error(error.message || "Failed to upload media");
    }
  };

  return (
    <Modal
      title="Upload Media"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter media title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Enter media description" rows={3} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            <Option value="Books">Books</Option>
            <Option value="Videos">Videos</Option>
            <Option value="Audios">Audios</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="gradeLevel"
          label="Grade Level"
          rules={[{ required: true, message: "Please select a grade level" }]}
        >
          <Select placeholder="Select a grade">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
              <Option key={grade} value={grade}>
                Grade {grade}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: "Please enter a subject" }]}
        >
          <Input placeholder="Enter subject" />
        </Form.Item>
        <Form.Item
          name="resourceType"
          label="Resource Type"
          rules={[{ required: true, message: "Please select a resource type" }]}
        >
          <Select placeholder="Select resource type">
            <Option value="book">Book</Option>
            <Option value="video">Video</Option>
            <Option value="audio">Audio</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Media File" rules={[{ required: true }]}>
          <Upload
            accept="video/*,audio/*"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload Media</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Thumbnail Image (Optional)">
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            fileList={thumbnailList}
            onChange={handleThumbnailChange}
          >
            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="additionalText"
          label="Additional Information (Optional)"
        >
          <Input.TextArea placeholder="Add further details if needed" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MediaUploadModal;
