import { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';

const AdmissionManagement = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/applications');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Format the data to include the 'id' field as 'key' for each row
        const formattedData = data.map((item) => ({
          key: item.Application_ID,  // Use the 'id' as the unique key
          firstName: item.Applicant_Name, // Updated for first name
          secondName: item.Second_Name, // Added second name
          dateOfBirth: item.Date_of_Birth,
          gender: item.Gender,
          gradeLevelApplied: item.Grade_Level_Applied,
          guardianName: item.Guardian_Name,
          guardianContact: item.Guardian_Contact,
          previousSchool: item.Previous_School,
          applicationDate: item.Application_Date,
          preferredSchool: item.Preferred_School,
          remarks: item.Remarks,
          status: item.Status || 'Pending', // Default to 'Pending' if no status
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (key, newStatus) => {
    fetch(`http://localhost:3000/api/updateStatus/${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Update the status in the frontend
          const updatedData = dataSource.map((item) =>
            item.key === key ? { ...item, status: newStatus } : item
          );
          setDataSource(updatedData);
  
          message.success(data.message);
        } else {
          message.error('An error occurred');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error('Failed to update status');
      });
  };
  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName', // Display first name
    },
    {
      title: 'Second Name',
      dataIndex: 'secondName', // Display second name
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Grade Level',
      dataIndex: 'gradeLevelApplied',
    },
    {
      title: 'Preferred School',
      dataIndex: 'preferredSchool',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <span>
          {text}
          <Button
            type="primary"
            onClick={() => handleStatusChange(record.key, 'Accepted')}
            disabled={text === 'Accepted' || text === 'Denied'}
            style={{ marginLeft: 8 }}
          >
            Accept
          </Button>
          <Button
            type="danger"
            onClick={() => handleStatusChange(record.key, 'Denied')}
            disabled={text === 'Accepted' || text === 'Denied'}
            style={{ marginLeft: 8 }}
          >
            Deny
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-semibold '>Admission Management</h1>
      <Table 
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => <p>{record.remarks}</p>,
        }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdmissionManagement;
