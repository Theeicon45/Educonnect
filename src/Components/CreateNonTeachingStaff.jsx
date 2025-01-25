import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const CreateNonTeachingStaff = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState([]);

  // Fetch schools when the modal is opened
  useEffect(() => {
    if (visible) {
      fetch("http://localhost:3000/api/schools")
        .then((response) => response.json())
        .then((data) => setSchools(data))
        .catch((error) => {
          console.error("Error fetching schools:", error);
          message.error("Failed to fetch schools.");
        });
    }
  }, [visible]);

  const handleSubmit = async (values) => {
    try {
      // Find the school ID based on the selected school name
      const selectedSchool = schools.find(
        (school) => school.School_Name === values.School_Name
      );

      const payload = {
        ...values,
        School_ID: selectedSchool ? selectedSchool.School_ID : null, // Map selected school name to its ID
      };

      const response = await fetch("http://localhost:3000/api/non-teaching-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Non-Teaching Staff created successfully!");
        form.resetFields();
        onClose();
      } else {
        const errorResponse = await response.json();
        message.error(`Failed to create non-teaching staff: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while creating the non-teaching staff.");
    }
  };

  return (
    <Modal
      title="Create Non-Teaching Staff"
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
          name="Last_Name"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Position"
          label="Position"
          rules={[{ required: true, message: "Position is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Contact_Info"
          label="Contact Info"
          rules={[{ required: true, message: "Contact Info is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Department"
          label="Department"
          rules={[{ required: true, message: "Department is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="School_Name"
          label="School"
          rules={[{ required: true, message: "Please select a school" }]}
        >
          <Select placeholder="Select a school">
            {schools.map((school) => (
              <Option key={school.School_ID} value={school.School_Name}>
                {school.School_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNonTeachingStaff;
