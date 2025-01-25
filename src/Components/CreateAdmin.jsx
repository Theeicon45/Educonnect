import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const CreateAdmin = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values, Role: values.Role || "Admin" };

      const response = await fetch("http://localhost:3000/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Admin created successfully!");
        form.resetFields();
        onClose();
      } else {
        const errorResponse = await response.json();
        message.error(`Failed to create admin: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while creating the admin.");
    }
  };

  return (
    <Modal
      title="Create Admin"
      visible={visible}
      onCancel={onClose}
      onOk={() => {
        form
          .validateFields()
          .then(handleSubmit)
          .catch(() => {
            message.error("Validation failed.");
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="First_Name"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Second_Name"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Valid Email is required" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Role"
          label="Role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select placeholder="Select Role">
            <Option value="Admin">Admin</Option>
            <Option value="SuperAdmin">SuperAdmin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAdmin;
