import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message, Select } from 'antd';

const StudentManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch data from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/students?search=${search}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      message.error('Failed to fetch students');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  // Handle Edit Submission
  const handleEditSubmit = async (values) => {
    try {
      await fetch(`http://localhost:3000/api/students/${selectedStudent.Student_Record_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('Student updated successfully');
      setIsEditVisible(false);
      fetchData();
    } catch (error) {
      message.error('Failed to update student');
    }
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'Full_Name',
      key: 'Full_Name',
    },
    {
      title: 'Enrollment Year',
      dataIndex: 'Enrollment_Year',
      key: 'Enrollment_Year',
    },
    {
      title: 'Year Level',
      dataIndex: 'Year_Level',
      key: 'Year_Level',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedStudent(record);
              setIsProfileVisible(true);
            }}
          >
            View Profile
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedStudent(record);
              form.setFieldsValue(record); // Pre-fill the form
              setIsEditVisible(true);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
  <h1>Student Management</h1>

  {/* Search Bar */}
  <Input.Search
    placeholder="Search by name"
    allowClear
    onChange={(e) => setSearch(e.target.value)}
    style={{ marginBottom: 16, width: 300 }}
  />

  {/* Student Table */}
  <Table
    dataSource={data}
    columns={columns}
    rowKey="Student_Record_ID"
    loading={loading}
    pagination={{ pageSize: 10 }}
  />

  {/* Profile Modal */}
  <Modal
    title="Student Profile"
    visible={isProfileVisible}
    onCancel={() => setIsProfileVisible(false)}
    footer={[
      <Button key="close" onClick={() => setIsProfileVisible(false)}>
        Close
      </Button>,
    ]}
  >
    {selectedStudent && (
      <div>
        <p><strong>Full Name:</strong> {selectedStudent.Full_Name}</p>
        <p><strong>Enrollment Year:</strong> {selectedStudent.Enrollment_Year}</p>
        <p><strong>Year Level:</strong> {selectedStudent.Year_Level}</p>
        <p><strong>Status:</strong> {selectedStudent.Status}</p>
      </div>
    )}
  </Modal>

  {/* Edit Modal */}
  <Modal
    title="Edit Student"
    visible={isEditVisible}
    onCancel={() => setIsEditVisible(false)}
    onOk={() => {
      form.validateFields().then(handleEditSubmit).catch((info) => {
        message.error('Validation failed');
      });
    }}
  >
    <Form form={form} layout="vertical">
      <Form.Item name="Full_Name" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Enrollment_Year" label="Enrollment Year" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Year_Level" label="Year Level" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      {/* Status Dropdown */}
      <Form.Item name="Status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Active">Activate</Select.Option>
          <Select.Option value="Inactive">Deactivate</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>
</div>

  );
};

export default StudentManagement;
