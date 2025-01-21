import  { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const TeacherCreation = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Fetch schools when the modal is opened
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
      const selectedSchool = schools.find(
        (school) => school.School_Name === values.School_Name
      );
      const payload = {
        ...values,
        School_ID: selectedSchool.School_ID, // Map selected school name to its ID
      };

      const response = await fetch("http://localhost:3000/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }); 

      if (response.ok) {
        message.success("Teacher added successfully!");
        form.resetFields();
        onClose();
      } else {
        message.error("Failed to add teacher.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while adding the teacher.");
    }
  };

  return (
    <Modal
      title="Create Teacher"
      visible={visible}
      onCancel={onClose}
      onOk={() => {
        form
          .validateFields()
          .then(handleSubmit)
          .catch((info) => {
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
          name="Email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Valid Email is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone_Number"
          label="Phone Number"
          rules={[{ required: true, message: "Phone Number is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Subject_Specialty"
          label="Subject Specialty"
          rules={[{ required: true, message: "Subject Specialty is required" }]}
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
        <Form.Item
          name="Employment_Status"
          label="Employment Status"
          rules={[{ required: true, message: "Employment Status is required" }]}
        >
          <Select>
            <Option value="Full-Time">Full-Time</Option>
            <Option value="Part-Time">Part-Time</Option>
            <Option value="Contract">Contract</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="Hire_Date"
          label="Hire Date"
          rules={[{ required: true, message: "Hire Date is required" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="Status"
          label="Status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Option value="Active">Activate</Option>
            <Option value="Inactive">Deactivate</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherCreation;
