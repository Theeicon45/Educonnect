import React, { useEffect, useState } from "react";
import { Table, Button, Input, Tag, Modal, Form, Select, message } from "antd";
import axios from "axios";
import { moredark } from "../Utils/images";

const { Search } = Input;
const { Option } = Select;

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]); // Original dataset
  const [filteredTeachers, setFilteredTeachers] = useState([]); // Filtered dataset
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [form] = Form.useForm();

  // Fetch teacher data
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/teachers`);
      setTeachers(response.data);
      setFilteredTeachers(response.data); // Initially, filtered = all
    } catch (error) {
      console.error("Error fetching teachers:", error);
      message.error("Failed to load teacher data.");
    }
  };

  // Handle Search
  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      const filteredData = teachers.filter(
        (teacher) =>
          teacher.First_Name.toLowerCase().includes(value.toLowerCase()) ||
          teacher.Last_Name.toLowerCase().includes(value.toLowerCase()) ||
          teacher.Email.toLowerCase().includes(value.toLowerCase()) ||
          teacher.Phone_Number.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTeachers(filteredData);
    } else {
      setFilteredTeachers(teachers); // Reset to all teachers if search is cleared
    }
  };

  // Handle Edit Modal Submit
  const handleEditSubmit = async () => {
    try {
      const updatedValues = await form.validateFields();
      await axios.put(
        `http://localhost:3000/api/teachers/${selectedTeacher.Teacher_ID}`,
        updatedValues
      );
      message.success("Teacher updated successfully.");
      setIsEditModalVisible(false);
      fetchTeachers(); // Refresh data
    } catch (error) {
      console.error("Error updating teacher:", error);
      message.error("Failed to update teacher.");
    }
  };

  // Columns Definition
  const columns = [
    {
      title: "First Name",
      dataIndex: "First_Name",
      key: "First_Name",
    },
    {
      title: "Last Name",
      dataIndex: "Last_Name",
      key: "Last_Name",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone Number",
      dataIndex: "Phone_Number",
      key: "Phone_Number",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status) => {
        let color = "green";
        if (status === "Inactive") color = "red";
        else if (status === "On Leave") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "School",
      dataIndex: "School_Name",
      key: "School_Name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedTeacher(record);
              Modal.info({
                title: `${record.First_Name} ${record.Last_Name}`,
                content: (
                  <div>
                    <p>Email: {record.Email}</p>
                    <p>Phone: {record.Phone_Number}</p>
                    <p>Status: {record.Status}</p>
                    <p>School: {record.School_Name}</p>
                  </div>
                ),
              });
            }}
          >
            View
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedTeacher(record);
              form.setFieldsValue(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white p-2 rounded-lg">
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Employee Table</h1>
        <img
          src={moredark}
          alt=""
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
      <div className="mb-4">
        <Search
          placeholder="Search teachers by name, email, or phone..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredTeachers}
        rowKey={(record) => record.Teacher_ID}
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Teacher"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="First_Name"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Last_Name"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Phone_Number"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="Status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="On Leave">On Leave</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherTable;
