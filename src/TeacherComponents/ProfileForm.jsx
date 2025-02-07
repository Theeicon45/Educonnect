import React from "react";
import { Form, Input, Button } from "antd";

const ProfileForm = () => {
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <Form layout="vertical" onFinish={onFinish}>
        {/* First Name */}
        <Form.Item
          label={<span className="text-lg font-semibold">First Name</span>}
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name!" }]}
        >
          <Input placeholder="Enter first name" className="h-[40px]" />
        </Form.Item>

        {/* Second Name */}
        <Form.Item
          label={<span className="text-lg font-semibold">Second Name</span>}
          name="secondName"
          rules={[{ required: true, message: "Please enter your second name!" }]}
        >
          <Input placeholder="Enter second name" className="h-[40px]" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={<span className="text-lg font-semibold">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter email" className="h-[40px]" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">Save Changes</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;
