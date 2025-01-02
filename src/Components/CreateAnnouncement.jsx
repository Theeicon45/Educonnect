import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateAnnouncement = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      const response = await fetch('http://localhost:3000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Announcement created successfully!');
        form.resetFields();
        onClose();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Failed to create announcement');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while creating the announcement.');
    }
  };

  return (
    <Modal
      title="Create Announcement"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="Title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the announcement!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Content"
          label="Content"
          rules={[{ required: true, message: 'Please input the content of the announcement!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="Target_Audience"
          label="Target Audience"
          rules={[{ required: true, message: 'Please select the target audience!' }]}
        >
          <Select placeholder="Select a target audience">
            <Option value="System">System</Option>
            <Option value="School">School</Option>
            <Option value="Grade">Grade</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Target_ID"
          label="Target ID (Optional)"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Expiry_Date"
          label="Expiry Date"
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Announcement
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAnnouncement;
