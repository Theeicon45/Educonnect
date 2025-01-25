import { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";

const SchoolCreation = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("School created successfully!");
        form.resetFields();
        onClose();
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to create school.");
      }
    } catch (error) {
      console.error("Error creating school:", error);
      message.error("An error occurred while creating the school.");
    }
  };

  return (
    <Modal
      title="Create School"
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
          name="School_Name"
          label="School Name"
          rules={[{ required: true, message: "School Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Location"
          label="Location"
          rules={[{ required: true, message: "Location is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Contact_Number"
          label="Contact Number"
          rules={[{ required: true, message: "Contact Number is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Valid Email is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Principal_Name"
          label="Principal Name"
          rules={[{ required: true, message: "Principal Name is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SchoolCreation;
