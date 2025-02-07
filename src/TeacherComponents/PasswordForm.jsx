import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const PasswordForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Get token from local storage
    if (!token) {
      message.error("Authentication error. Please log in again.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the headers
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        message.success(data.message);
        form.resetFields();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };
  
  return (
    <div className="p-6 max-w-md">
      <h1 className="font-semibold text-2xl items-center flex justify-center">Password</h1>
      <h2 className="text-lg font-semibold text-gray-400 mb-4">Change Password</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={<span className="text-lg font-semibold">Current Password</span>}
          name="currentPassword"
          rules={[{ required: true, message: "Please enter your current password" }]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>

        <Form.Item
          label={<span className="text-lg font-semibold">New Password</span>}
          name="newPassword"
          rules={[
            { required: true, message: "Please enter a new password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label={<span className="text-lg font-semibold">Confirm New Password</span>}
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="font-semibold w-full" loading={loading}>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordForm;
